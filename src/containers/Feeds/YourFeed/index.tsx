import { fetchFeed } from "@/api/methods";
import { Article } from "@/app/page";
import Card from "@/components/Card";
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";
import Loading from "@/components/Loading";

import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const YourFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(false);
  const context = useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const token = context?.user?.token;
  const fetchData = () => {
    articles?.length === 0 && setLoading(true);
    if (context?.isAuthenticated) {
      fetchFeed(offset, token)
        .then((res) => res.json())
        .then((data) => {
          setArticles(data?.articles);
          setOffset((offset) => offset + 10);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid  grid-cols-1  lg:grid-cols-3 sm:grid-cols-2 gap-4">
      {isLoading ? (
        <Loading />
      ) : articles?.length === 0 ? (
        "No articles are here... yet."
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

export default YourFeed;
