import environmentalLaw from '../content/articles/environmental-law-2024.mdx';
import privacyLaws from '../content/articles/privacy-laws-ai-era.mdx';
import intellectualProperty from '../content/articles/intellectual-property-rights.mdx';

export const articles = [
  {
    frontmatter: environmentalLaw.frontmatter,
    content: environmentalLaw.content
  },
  {
    frontmatter: privacyLaws.frontmatter,
    content: privacyLaws.content
  },
  {
    frontmatter: intellectualProperty.frontmatter,
    content: intellectualProperty.content
  }
];

export async function GET() {
  return new Response(JSON.stringify(articles), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}