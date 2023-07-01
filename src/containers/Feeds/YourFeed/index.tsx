import { Article, LocalCard } from "@/app/page";
import { Card } from "@/components/ui/card";
import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const YourFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context?.isAuthenticated) {
      setLoading(true);
      fetch("https://api.realworld.io/api/articles/feed", {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",

          Authorization: "Token " + context?.user?.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArticles(data?.articles);
          setLoading(false);
        });
    }
  }, []);
  return (
    <Card className="flex flex-col gap-4">
      {isLoading
        ? "...Loading"
        : articles?.length === 0
        ? "No articles are here... yet."
        : articles?.map((article) => (
            <LocalCard key={article.createdAt} article={article} />
          ))}
    </Card>
  );
};

export default YourFeed;
