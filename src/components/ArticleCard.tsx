import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  imageUrl?: string;
  tags: string[];
}

export const ArticleCard = ({
  title,
  description,
  date,
  author,
  slug,
  imageUrl,
  tags,
}: ArticleCardProps) => {
  return (
    <Link to={`/article/${slug}`} className="block fade-in">
      <article className="article-card">
        {imageUrl && (
          <div className="relative h-48 mb-4 overflow-hidden rounded">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm text-muted-foreground">{author}</span>
            <time className="text-sm text-muted-foreground">{date}</time>
          </div>
        </div>
      </article>
    </Link>
  );
};