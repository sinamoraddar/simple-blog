"use client";

import Navbar from "@/components/Navbar/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GlobalFeed from "@/containers/Feeds/GlobalFeed";
import YourFeed from "@/containers/Feeds/YourFeed";
import { AuthContext } from "@/contexts/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";
import { Input } from "postcss";
import { useContext, useEffect, useState } from "react";

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

export const LocalCard = ({ article }: CardProps) => (
  <Link href={`/article/${article.slug}`}>
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{article.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        Tags:
        {article.tagList.map((tag: string) => (
          <Badge className="mx-2" key={tag}>
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  </Link>
);

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isMyFeed, setIsMyFeed] = useState(false);
  const context = useContext(AuthContext);

  return (
    <main className="px-8 justify-between flex ">
      <Tabs defaultValue="globalFeed" className="w-[400px] w-full">
        <TabsList
          className={`grid w-full grid-cols-${
            context?.isAuthenticated ? "2" : "1"
          }`}
        >
          {context?.isAuthenticated && (
            <TabsTrigger value="yourFeed">Your Feed</TabsTrigger>
          )}
          <TabsTrigger value="globalFeed">Global Feed</TabsTrigger>
        </TabsList>
        {context?.isAuthenticated && (
          <TabsContent value="yourFeed">
            <YourFeed />
          </TabsContent>
        )}
        <TabsContent value="globalFeed">
          <GlobalFeed />
        </TabsContent>
      </Tabs>
    </main>
  );
}
