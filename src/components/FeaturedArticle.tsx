import { Link } from "react-router-dom";

interface FeaturedArticleProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export const FeaturedArticle = ({
  title,
  description,
  imageUrl,
  slug,
}: FeaturedArticleProps) => {
  return (
    <Link to={`/article/${slug}`} className="block">
      <article className="relative h-[70vh] overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 w-full p-8 space-y-4">
          <div className="glass-card p-6 rounded-lg max-w-3xl">
            <h1 className="text-4xl font-semibold text-white mb-4">{title}</h1>
            <p className="text-gray-200">{description}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};