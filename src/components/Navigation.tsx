import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-serif font-semibold">
          Legal Insights
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/categories" className="text-muted-foreground hover:text-foreground">
            Categories
          </Link>
          <Link to="/authors" className="text-muted-foreground hover:text-foreground">
            Authors
          </Link>
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};