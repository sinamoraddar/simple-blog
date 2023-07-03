"use client";

import {
  followOrUnFollowAuthor,
  getArticleInfo,
  likeOrUnlikeArticle,
} from "@/api/methods";
import { Article } from "@/app/page";
import Loading from "@/components/Loading";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
import CommentsSection from "@/modules/CommentsSection";


const Page = ({ params }: { params: { slug: string } }) => {
  const [article, setArticles] = useState<Article | null>(null);
  const context = useContext(AuthContext);
  const token = context?.user?.token;
  useEffect(() => {
    getArticleInfo({
      slug: params.slug,
      isAuthenticated: context?.isAuthenticated,
      token,
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data?.article);
      });
  }, [params.slug]);

  return (
    <div className="py-8">
      {article ? (
        <>
          <div className="hero">
            <div className="hero-content text-center">
              <div className="max-w-lg">
                <h1 className="text-5xl font-bold">{article.title}</h1>
              </div>
            </div>
          </div>
          {ProfileSection(article, setArticles)}

          <div className="divider" />
          <div className="max-w-md mx-auto">
            {article.body}
            {/* todo : extract the tags component */}

            {article.tagList.length > 0 && (
              <div className="flex my-4 flex-wrap gap-2 ">
                {article.tagList.map((tag) => (
                  <div className="badge badge-outline" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="divider" />
          <CommentsSection context={context} article={article} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;

function ProfileSection(article: Article, setArticles: any) {
  const router = useRouter();
  const context = useContext(AuthContext);

  const redirectToRegister = () => {
    router.push(`/register`);
  };

  const onLike = (e: any) => {
    e.stopPropagation();
    if (!context?.isAuthenticated) {
      redirectToRegister();
      return;
    }
    likeOrUnlikeArticle({
      slug: article.slug,
      favorited: article.favorited,
      token: context.user?.token,
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data?.article);
      });
  };
  const onFollow = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (!context?.isAuthenticated) {
      redirectToRegister();
      return;
    }
    followOrUnFollowAuthor({
      username: article.author.username,
      following: article.author.following,
      token: context.user?.token,
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles((article: Article) => ({
          ...article,
          author: data?.profile,
        }));
      });
  };

  return (
    <div className="flex gap-2 items-center  justify-center ">
      <div className="flex gap-2 items-center">
        <div>{article.author.username}</div>
      </div>
      <button className="btn btn-outline" onClick={onFollow}>
        {article.author.following ? "Unfollow" : "Follow"} (
        {article.author.username})
      </button>
      <button className="btn btn-outline btn-accent" onClick={onLike}>
        {article.favorited ? "Unlike" : "❤️ Like"} ({article.favoritesCount})
      </button>
    </div>
  );
}
