"use client";

import { Article } from "@/app/page";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const [article, setArticles] = useState<Article | null>(null);
  const [comments, setComments] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.realworld.io/api/articles/" + params.slug)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data?.article);
        setLoading(false);
      });
  }, [params.slug]);
  useEffect(() => {
    setLoading(true);
    fetch("https://api.realworld.io/api/articles/" + params.slug + "/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data?.comments);
        setLoading(false);
      });
  }, [params.slug]);

  if (isLoading) return <p>Loading...</p>;
  if (!article) return <p>No profile data</p>;

  const likePost = () => {
    //todo: complete here
    alert("liked");
  };
  return (
    <div>
      <div onClick={likePost}>Stars: {article.favoritesCount}</div>

      {params.slug}

      <p>{article.title}</p>
      <p>{article.description}</p>

      <div>comment section goes here:</div>
    </div>
  );
};

export default Page;
