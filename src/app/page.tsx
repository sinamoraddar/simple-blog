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
    <div className="card  h-full  bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{article.title}</h2>
        <p>{article.description}</p>
        <div className="divider" />
        <div className="card-actions ">
          {" "}
          {article.tagList.map((tag: string) => (
            <div className="badge badge-outline" key={tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isMyFeed, setIsMyFeed] = useState(false);
  const context = useContext(AuthContext);
  type TabType = "Global" | "Yours";

  const [activeTab, setActiveTab] = useState<TabType>("Yours");

  const changeTab = (tab: TabType) => {
    setActiveTab(tab);
  };
  return (
    <main className="px-8 justify-between flex  flex-col py-4">
      <div className="tabs">
        <a
          className={`tab tab-lifted ${
            activeTab === "Global" ? "tab-active" : ""
          }`}
          onClick={() => changeTab("Global")}
        >
          Global
        </a>
        {context?.isAuthenticated && (
          <a
            className={`tab tab-lifted ${
              activeTab === "Yours" ? "tab-active" : ""
            }`}
            onClick={() => changeTab("Yours")}
          >
            Yours
          </a>
        )}
      </div>
      <div className="my-4">
        {activeTab === "Global" ? <GlobalFeed /> : <YourFeed />}
      </div>
    </main>
  );
}
