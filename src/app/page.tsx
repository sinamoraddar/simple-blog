"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Article {
  author: {
    username: string;
    bio: null | string;
    image: string;
    following: boolean;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

type CardProps = { article: Article };

const Card = ({ article }: CardProps) => (
  <Link href={`/article/${article.slug}`}>
    <div className="p-3">
      <h3>Title: {article.title}</h3>

      <p>Description: {article.description}</p>

      <p>slug: {article.slug}</p>
    </div>
  </Link>
);

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
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

  if (isLoading) return <p>Loading...</p>;
  if (articles.length === 0) return <p>No profile data</p>;

  console.log(articles);
  return (
    <main>
      {articles.map((article) => (
        <Card key={article.createdAt} article={article} />
      ))}
    </main>
  );
}
