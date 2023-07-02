"use client";

import { Article } from "@/app/page";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
interface CommentShape {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

const Page = ({ params }: { params: { slug: string } }) => {
  const [article, setArticles] = useState<Article | null>(null);
  const [isLoading, setLoading] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.realworld.io/api/articles/" + params.slug, {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...(context?.isAuthenticated && {
          Authorization: "Token " + context?.user?.token,
        }),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data?.article);
        setLoading(false);
      });
  }, [params.slug]);

  const likePost = () => {
    //todo: complete here
    alert("liked");
  };

  return (
    <div>
      {article ? (
        <>
          {" "}
          <header>
            <h1>{article.title}</h1>

            {ProfileSection(article, setArticles)}
          </header>
          <div className="divider" />
          <div>
            {article.body}
            {/* todo : extract the tags component */}
            <div>
              {article.tagList.map((tag: string) => (
                <Badge className="mx-2" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="divider" />

            {ProfileSection(article, setArticles)}
          </div>
          <CommentsSection context={context} article={article} />
        </>
      ) : (
        <span className="loading loading-spinner loading-lg"></span>
      )}
    </div>
  );
};

export default Page;

function CommentsSection({
  context,
  article,
}: {
  context: {
    user:
      | import("/Users/sinamoraddar/Documents/Projects/simple-blog/src/contexts/AuthProvider").User
      | null;
    setUser: any;
    isAuthenticated: boolean;
    onLogout: any;
  } | null;
  article: Article;
}) {
  const [body, setBody] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [comments, setComments] = useState<CommentShape[] | null>(null);

  const onChange = (e: any) => {
    const { value } = e.target;
    setBody(value);
  };

  const postComment = () => {
    setLoading(true);
    fetch(`https://api.realworld.io/api/articles/${article.slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Token " + context?.user?.token,
      },

      body: JSON.stringify({
        comment: {
          body: body.trim(),
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((comments) => {
          if (comments) {
            return [data?.comment, ...comments];
          }
          return comments;
        });
        setLoading(false);
        setBody("");
      });
  };

  const fetchComments = () => {
    if (!context?.isAuthenticated) {
      return;
    }
    setLoading(true);
    fetch(
      "https://api.realworld.io/api/articles/" + article.slug + "/comments",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Token " + context?.user?.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setComments(data?.comments);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      {context?.isAuthenticated ? (
        <>
          {" "}
          comment section
          <textarea
            value={body}
            onChange={onChange}
            placeholder="Write a comment"
          />
          <button
            disabled={isLoading || !body}
            onClick={postComment}
            className="btn btn-primary"
          >
            post comment
          </button>
          {comments && comments?.length > 0 && (
            <ul className="gap-4 flex-col flex ">
              {comments?.map((comment) => (
                <div
                  key={comment.createdAt}
                  className="card w-96 bg-base-100 shadow-xl"
                >
                  <div className="card-body">
                    <p>{comment.body}</p>
                  </div>
                  <div className="divider" />
                  <div className="card-footer">
                    <div className="flex ">
                      {" "}
                      <img
                        className="rounded-full w-10 h-10"
                        src={comment.author.image}
                        alt={comment.author.username}
                      />
                      <Link href={`/profile/${comment.author.username}`}>
                        {comment.author.username}
                        {comment.createdAt}
                      </Link>
                    </div>
                    <button>delete comment</button>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <Link href={"/sign-in"}> Sign in </Link>or
          <Link href={"/register"}> sign up </Link>
          to add comments on this article.
        </>
      )}
    </div>
  );
}

function ProfileSection(article: Article, setArticles: any) {
  const router = useRouter();
  const context = useContext(AuthContext);

  const redirect = () => {
    router.push(`/profile/${article.author.username}`);
  };
  const redirectToRegister = () => {
    router.push(`/register`);
  };

  const onLike = (e) => {
    e.stopPropagation();
    if (!context?.isAuthenticated) {
      redirectToRegister();
      return;
    }
    fetch(`https://api.realworld.io/api/articles/${article.slug}/favorite`, {
      method: article.favorited ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Token " + context?.user?.token,
      },
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
    fetch(
      `
    https://api.realworld.io/api/profiles/${article.author.username}/follow`,
      {
        method: article.author.following ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Token " + context?.user?.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles((article: Article) => ({
          ...article,
          author: data?.profile,
        }));
      });
  };

  return (
    <div className="flex gap-2 cursor-pointer" onClick={redirect}>
      <img
        className="rounded-full w-50 h-50"
        src={article.author.image}
        alt={article.author.username}
      />
      <div>
        {" "}
        <div>{article.author.username}</div>
        <div>{article.updatedAt}</div>
      </div>
      <button onClick={onFollow}>
        {article.author.following ? "Unfollow" : "Follow"} (
        {article.author.username})
      </button>
      <button onClick={onLike}>
        {article.favorited ? "Unlike" : "❤️ Like"} ({article.favoritesCount})
      </button>
    </div>
  );
}
