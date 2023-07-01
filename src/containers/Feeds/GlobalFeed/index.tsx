import { Article, LocalCard } from "@/app/page";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";

const GlobalFeed = () => {
  const [articles, setArticles] = useState<Article[] | null>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.realworld.io/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data?.articles);
        setLoading(false);
      });
  }, []);
  return (
    <Card className="flex flex-col gap-4">
      {isLoading
        ? "...Loading"
        : articles?.length === 0
        ? "Nothing to see"
        : articles?.map((article) => (
            <LocalCard key={article.createdAt} article={article} />
          ))}
    </Card>
  );
};

export default GlobalFeed;
