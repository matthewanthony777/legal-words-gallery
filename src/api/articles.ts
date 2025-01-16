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
  console.log(`Fetching from: ${baseUrl}${filename}`);
  try {
    const response = await fetch(`${baseUrl}${filename}`);
    if (!response.ok) {
      console.error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch ${filename}`);
    }
    const text = await response.text();
    console.log(`Successfully fetched ${filename}`);
    return text;
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    throw error;
  }
};

// Read all articles from GitHub
export const getArticles = async (): Promise<Article[]> => {
  const filenames = [
    'environmental-law-2024.mdx',
    'privacy-laws-ai-era.mdx',
    'intellectual-property-rights.mdx'
  ];
  
  try {
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
  } catch (error) {
    console.error('Error getting articles:', error);
    throw error;
  }
};

// Get a single article by slug
export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  try {
    const articles = await getArticles();
    const article = articles.find(article => article.frontmatter.slug === slug);
    if (!article) {
      console.log(`No article found with slug: ${slug}`);
      return undefined;
    }
    console.log(`Found article with slug: ${slug}`);
    return article;
  } catch (error) {
    console.error('Error getting article by slug:', error);
    throw error;
  }
};

// API endpoint for all articles
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.pathname.split('/api/articles/')[1];

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (slug) {
      console.log(`API: Fetching article with slug: ${slug}`);
      const article = await getArticleBySlug(slug);
      if (!article) {
        console.error(`API: Article not found for slug: ${slug}`);
        return new Response(JSON.stringify({ error: 'Article not found' }), { 
          status: 404,
          headers 
        });
      }
      return new Response(JSON.stringify(article), { headers });
    }

    console.log('API: Fetching all articles');
    const articles = await getArticles();
    return new Response(JSON.stringify(articles), { headers });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch articles', details: error.message }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}