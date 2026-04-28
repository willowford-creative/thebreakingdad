import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ---------------------------------------------------------------------------
// Shared validators
// ---------------------------------------------------------------------------

const slugRegex = /^[a-z0-9-]+$/;

const baseSchema = z.object({
  title: z.string(),
  description: z.string().min(60, 'Description too short for SEO — needs 60+ chars').max(200, 'Description too long for SEO — max 200 chars'),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  heroAlt: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
  // Optional Field Note issue number (long-reads, manually curated).
  // Defaults to auto-computed (months since Jan 2021 launch) if unset.
  issueNumber: z.number().int().positive().optional(),
});

// ---------------------------------------------------------------------------
// Posts collection — Separated parents content
// ---------------------------------------------------------------------------

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: baseSchema.extend({
    subhub: z.enum([
      'co-parenting',
      'blended-family',
      'money-and-benefits',
      'rights-and-law',
      'starting-over',
    ]),
    // E-E-A-T signal — first-person lived-experience hook, shown at top of post
    experienceNote: z
      .string()
      .min(40, 'experienceNote must be at least 40 characters — make it personal')
      .max(400, 'experienceNote must be under 400 characters — keep it punchy'),
    // When true, renders a YMYL disclaimer block (benefits, law, money posts)
    ymylDisclaimer: z.boolean().optional().default(false),
  }),
});

// ---------------------------------------------------------------------------
// Reviews collection
// ---------------------------------------------------------------------------

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: baseSchema.extend({
    productName: z.string(),
    rating: z.number().min(1).max(5).multipleOf(0.5).optional(), // omit for roundups; halves allowed (e.g. 4.5)
    usageDuration: z.string(), // e.g. "Used for 4 years"
    productCategory: z.enum([
      'family-tech',
      'parenting-kit',
      'shoes-and-fitness',
      'home-and-lifestyle',
      'days-out',
    ]),
    pros: z.array(z.string()).min(1, 'At least one pro is required'),
    cons: z.array(z.string()).min(1, 'At least one con is required'),
    hasAffiliateLinks: z.boolean().default(true),
    affiliateDisclaimer: z.string().optional(), // override default disclosure text
  }),
});

// ---------------------------------------------------------------------------
// Parenting collection — general parenting content (pillar 3)
// Not separation-specific. Evergreen guides, how-tos, gift/product roundups,
// philosophy pieces. Sits alongside /separated-parents/ as a parallel pillar.
// ---------------------------------------------------------------------------

const parenting = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/parenting' }),
  schema: baseSchema.extend({
    topic: z.enum([
      'raising-kids',       // parenting skills, discipline, emotional
      'kit-and-gear',       // gift guides, product roundups, newborn essentials
      'family-life',        // lifestyle, sustainability, crafts, activities
      'days-out',           // local + travel family activities
      'digital-parenting',  // AI, tech, social, screens
    ]),
    // Optional first-person hook — recommended for guide-style posts
    experienceNote: z.string().min(40).max(400).optional(),
  }),
});

// ---------------------------------------------------------------------------
// Diary collection — dated, narrative pieces with anti-thin-content gates
// ---------------------------------------------------------------------------

// Schema fields below are zod-optional so legacy/draft entries don't break the
// content sync. The publish-time gates in src/utils/diaryGates.ts re-enforce
// them as hard errors for non-draft entries (where they actually matter).
const diary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/diary' }),
  schema: baseSchema
    .extend({
      lede: z.string().optional(),
      heroCaption: z.string().optional(),
      endFrame: z
        .object({
          src: z.string(),
          alt: z.string(),
          caption: z.string(),
        })
        .optional(),
      location: z.string().optional(),
      signOffTime: z.string().optional(),
      relatedPostSlug: z.string().optional(),
      isVignette: z.boolean().optional().default(false),
      authorId: z.string().optional().default('dan'),
    })
    // Diary descriptions can be tighter than baseSchema's 60-char floor —
    // the lede carries SEO weight, description is just a one-liner.
    .extend({
      description: z.string().min(40).max(220),
    }),
});

export const collections = { posts, reviews, parenting, diary };
