import { readFileSync } from 'fs';
import { join } from 'path';

interface ArticleFrontmatter {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  tags: string[];
  imageUrl?: string;
}

interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
}

// Helper function to extract frontmatter from MDX content
const extractFrontmatter = (content: string): ArticleFrontmatter => {
  const match = content.match(/---\n([\s\S]*?)\n---/);
  if (!match) return {} as ArticleFrontmatter;
  
  const frontmatterString = match[1];
  const frontmatter: Record<string, any> = {};
  
  frontmatterString.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      // Remove quotes if they exist
      frontmatter[key.trim()] = value.replace(/^['"](.*)['"]$/, '$1');
    }
  });
  
  return frontmatter as ArticleFrontmatter;
};

// Helper function to get content without frontmatter
const getContent = (content: string) => {
  return content.replace(/---\n[\s\S]*?\n---/, '').trim();
};

// Fetch raw content from GitHub
const fetchFromGitHub = async (filename: string) => {
  const baseUrl = 'https://raw.githubusercontent.com/matthewanthony777/legal-words-gallery/main/content/articles/';
  const response = await fetch(`${baseUrl}${filename}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filename}`);
  }
  return response.text();
};

// Read all articles from GitHub
export const getArticles = async (): Promise<Article[]> => {
  const filenames = [
    'environmental-law-2024.mdx',
    'privacy-laws-ai-era.mdx',
    'intellectual-property-rights.mdx'
  ];
  
  const articles = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fetchFromGitHub(filename);
      return {
        frontmatter: extractFrontmatter(content),
        content: getContent(content)
      };
    })
  );
  
  return articles;
};

// Get a single article by slug
export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  const articles = await getArticles();
  return articles.find(article => article.frontmatter.slug === slug);
};

// API endpoint for all articles
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split('/articles/')[1];

    if (slug) {
      const article = await getArticleBySlug(slug);
      if (!article) {
        return new Response('Article not found', { status: 404 });
      }
      return new Response(JSON.stringify(article), {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      });
    }

    const articles = await getArticles();
    return new Response(JSON.stringify(articles), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch articles' }), {
      status: 500,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  }
}