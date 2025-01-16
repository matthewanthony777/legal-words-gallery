import { readFileSync } from 'fs';
import { join } from 'path';

// Helper function to extract frontmatter from MDX content
const extractFrontmatter = (content: string) => {
  const match = content.match(/---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const frontmatterString = match[1];
  const frontmatter = {};
  
  frontmatterString.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      // Remove quotes if they exist
      frontmatter[key.trim()] = value.replace(/^['"](.*)['"]$/, '$1');
    }
  });
  
  return frontmatter;
};

// Helper function to get content without frontmatter
const getContent = (content: string) => {
  return content.replace(/---\n[\s\S]*?\n---/, '').trim();
};

// Read all articles from the content folder
const getArticles = () => {
  const articlesPath = join(process.cwd(), 'content', 'articles');
  const articles = [
    'environmental-law-2024.mdx',
    'privacy-laws-ai-era.mdx',
    'intellectual-property-rights.mdx'
  ].map(filename => {
    const filePath = join(articlesPath, filename);
    const content = readFileSync(filePath, 'utf-8');
    return {
      frontmatter: extractFrontmatter(content),
      content: getContent(content)
    };
  });
  return articles;
};

export const articles = getArticles();

export async function GET() {
  return new Response(JSON.stringify(articles), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}