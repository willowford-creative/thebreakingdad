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
    rating: z.number().int().min(1).max(5),
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
// Diary collection — voice pieces, not SEO targets
// ---------------------------------------------------------------------------

const diary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/diary' }),
  schema: baseSchema,
});

// ---------------------------------------------------------------------------
// Pages collection — static page content (about, privacy, etc.)
// ---------------------------------------------------------------------------

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, reviews, diary, pages };
