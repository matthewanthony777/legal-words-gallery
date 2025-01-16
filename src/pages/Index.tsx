import { Navigation } from "@/components/Navigation";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleCard } from "@/components/ArticleCard";

const Index = () => {
  // This would be replaced with actual data fetching from GitHub
  const featuredArticle = {
    title: "The Evolution of Environmental Law in 2024",
    description: "An in-depth analysis of recent changes in environmental legislation and their impact on businesses and communities.",
    imageUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    slug: "environmental-law-2024",
  };

  const articles = [
    {
      title: "Understanding Intellectual Property Rights",
      description: "A comprehensive guide to protecting your intellectual property in the digital age.",
      date: "2024-02-15",
      author: "Jane Smith",
      slug: "intellectual-property-rights",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      tags: ["IP Law", "Digital Rights"],
    },
    {
      title: "Corporate Law Updates Q1 2024",
      description: "Key changes in corporate legislation that business leaders need to know.",
      date: "2024-02-10",
      author: "John Doe",
      slug: "corporate-law-updates-2024",
      imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      tags: ["Corporate Law", "Business"],
    },
    {
      title: "Privacy Laws in the AI Era",
      description: "Navigating privacy regulations in the age of artificial intelligence.",
      date: "2024-02-05",
      author: "Sarah Johnson",
      slug: "privacy-laws-ai-era",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      tags: ["Privacy", "AI", "Technology"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container py-8 space-y-12">
        <FeaturedArticle {...featuredArticle} />
        
        <section>
          <h2 className="text-3xl font-serif font-semibold mb-8">Latest Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;