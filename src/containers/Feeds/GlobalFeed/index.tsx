import { Article } from "@/app/page";
import Card from "@/components/Card";
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";
import Loading from "@/components/Loading";

import React, { useEffect, useState } from "react";

const GlobalFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const fetchData = () => {
    articles?.length === 0 && setLoading(true);
    fetch(`https://api.realworld.io/api/articles?limit=10&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles((articles) => [...articles, ...data?.articles]);
        setOffset((offset) => offset + 10);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid  grid-cols-1  lg:grid-cols-3 sm:grid-cols-2 gap-4">
      {isLoading ? (
        <Loading />
      ) : articles?.length === 0 ? (
        "Nothing to see"
      ) : (
        <>
          {articles?.map((article) => (
            <Card key={article.createdAt} article={article} />
          ))}

          <InfiniteScroll fetchData={fetchData} />
        </>
      )}
    </div>
  );
};

export default GlobalFeed;
