import { Article } from "@/app/page";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

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
    <div className="grid  grid-cols-1  lg:grid-cols-3 sm:grid-cols-2 gap-4">
      {isLoading ? (
        <Loading />
      ) : articles?.length === 0 ? (
        "Nothing to see"
      ) : (
        articles?.map((article) => (
          <Card key={article.createdAt} article={article} />
        ))
      )}
    </div>
  );
};

export default GlobalFeed;
