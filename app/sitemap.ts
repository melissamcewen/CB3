import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com';
  
  // Get all blog posts
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const posts = fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      url: `${baseUrl}/blog/${file.replace('.md', '')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...posts,
  ];
}