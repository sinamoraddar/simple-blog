import { Article, LocalCard } from "@/app/page";
import Loading from "@/components/Loading";
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
      fetch("https://api.realworld.io/api/articles", {
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
    <div className="grid  grid-cols-1  lg:grid-cols-3 sm:grid-cols-2 gap-4">
      {isLoading ? (
        <Loading />
      ) : articles?.length === 0 ? (
        "No articles are here... yet."
      ) : (
        articles?.map((article) => (
          <LocalCard key={article.createdAt} article={article} />
        ))
      )}
    </div>
  );
};

export default YourFeed;
