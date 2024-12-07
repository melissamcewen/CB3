import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Safety Blog',
  description: 'Expert articles about food safety, ingredient analysis, and healthy eating tips.',
  openGraph: {
    title: 'Food Safety Blog | Ingredient Analyzer',
    description: 'Expert articles about food safety, ingredient analysis, and healthy eating tips.',
  }
};

export default async function BlogPage() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const posts = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: file.replace('.md', ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Food Safety Blog</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body">
              <h2 className="card-title text-2xl">{post.title}</h2>
              <p className="text-sm text-base-content/70">
                <time dateTime={new Date(post.date).toISOString()}>
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </p>
              <p className="mt-2">{post.excerpt}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}