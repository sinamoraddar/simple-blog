"use client";

import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";
import Navbar from "@/components/Navbar/Navbar";

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
