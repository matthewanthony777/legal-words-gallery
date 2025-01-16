import { useQuery } from "@tanstack/react-query";
import { ArticleCard } from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface Article {
  frontmatter: {
    title: string;
    date: string;
    author: string;
    description: string;
    slug: string;
    tags: string[];
    imageUrl?: string;
  };
  content: string;
}

const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch('/api/articles');
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
};

const Articles = () => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-serif mb-4">Error Loading Articles</h1>
          <p>Sorry, we couldn't load the articles. Please try again later.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-serif mb-8">Legal Articles</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles?.map((article) => (
          <ArticleCard
            key={article.frontmatter.slug}
            title={article.frontmatter.title}
            description={article.frontmatter.description}
            date={article.frontmatter.date}
            author={article.frontmatter.author}
            slug={article.frontmatter.slug}
            imageUrl={article.frontmatter.imageUrl}
            tags={article.frontmatter.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;