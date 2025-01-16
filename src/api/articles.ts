// Import the MDX files as raw content
import environmentalLaw from '../content/articles/environmental-law-2024.mdx?raw';
import privacyLaws from '../content/articles/privacy-laws-ai-era.mdx?raw';
import intellectualProperty from '../content/articles/intellectual-property-rights.mdx?raw';
import { serialize } from 'next-mdx-remote/serialize';

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

export const articles = [
  {
    frontmatter: extractFrontmatter(environmentalLaw),
    content: getContent(environmentalLaw)
  },
  {
    frontmatter: extractFrontmatter(privacyLaws),
    content: getContent(privacyLaws)
  },
  {
    frontmatter: extractFrontmatter(intellectualProperty),
    content: getContent(intellectualProperty)
  }
];

export async function GET() {
  return new Response(JSON.stringify(articles), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}