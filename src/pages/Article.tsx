import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleData {
  content: string;
  frontmatter: {
    title: string;
    date: string;
    author: string;
    description: string;
    tags: string[];
    imageUrl?: string;
  };
}

const fetchArticle = async (slug: string): Promise<ArticleData> => {
  const response = await fetch(`/api/articles/${slug}`);
  if (!response.ok) {
    throw new Error('Article not found');
  }
  return response.json();
};

const Article = () => {
  const { slug } = useParams();
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug || ''),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-serif mb-4">Article Not Found</h1>
          <p>Sorry, we couldn't find the article you're looking for.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <article className="prose prose-lg mx-auto">
        {article?.frontmatter.imageUrl && (
          <img
            src={article.frontmatter.imageUrl}
            alt={article.frontmatter.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="font-serif text-4xl mb-4">{article?.frontmatter.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <span>{article?.frontmatter.author}</span>
          <span>•</span>
          <time>{new Date(article?.frontmatter.date || '').toLocaleDateString()}</time>
        </div>
        <MDXRemote {...article?.content} />
      </article>
    </div>
  );
};

export default Article;