import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      type: 'article',
      publishedTime: data.date,
      authors: ['Ingredient Analyzer Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const posts = fs.readdirSync(postsDirectory);
  return posts.map((post) => ({
    slug: post.replace('.md', ''),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const fullPath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    datePublished: data.date,
    dateModified: data.date,
    description: data.excerpt,
    author: {
      '@type': 'Organization',
      name: 'Ingredient Analyzer Team',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto prose lg:prose-xl">
        <h1>{data.title}</h1>
        <p className="text-base-content/70">
          <time dateTime={new Date(data.date).toISOString()}>
            {new Date(data.date).toLocaleDateString()}
          </time>
        </p>
        <Markdown>{content}</Markdown>
      </article>
    </>
  );
}