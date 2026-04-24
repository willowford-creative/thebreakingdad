import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);

  // Combine and sort by publishDate descending
  const allItems = [
    ...posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/separated-parents/${post.id.replace(/\.(md|mdx)$/, '')}/`,
      categories: [post.data.subhub, ...(post.data.tags ?? [])],
    })),
    ...reviews.map((review) => ({
      title: review.data.title,
      description: review.data.description,
      pubDate: review.data.publishDate,
      link: `/reviews/${review.id.replace(/\.(md|mdx)$/, '')}/`,
      categories: [review.data.productCategory, ...(review.data.tags ?? [])],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'The Breaking Dad',
    description:
      'A UK dad writing about co-parenting, blended family life, and honest product reviews from Hampshire.',
    site: context.site ?? 'https://thebreakingdad.co.uk',
    items: allItems,
    customData: `<language>en-gb</language>`,
    stylesheet: false,
  });
}
