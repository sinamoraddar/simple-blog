"use client";

import { Article } from "@/app/page";
import Loading from "@/components/Loading";
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
            <div className="my-8">
              {article.tagList.map((tag: string) => (
                <Badge className="mx-2" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
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

  const deleteComment = (commentId: number) => {
    setLoading(true);
    fetch(
      `https://api.realworld.io/api/articles/${article.slug}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Token " + context?.user?.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setComments((comments) => {
          if (comments) {
            return comments.filter((comment) => comment.id !== commentId);
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
    <div className="max-w-md mx-auto">
      {context?.isAuthenticated ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="form-control ">
              <label className="input-group input-group-vertical">
                <span>Body</span>
                <textarea
                  className="w-full textarea resize-none"
                  value={body}
                  onChange={onChange}
                  placeholder="Write a comment"
                />
              </label>
            </div>{" "}
            <button
              disabled={isLoading || !body}
              onClick={postComment}
              className="btn btn-primary"
            >
              Send
            </button>
          </div>

          {comments && comments?.length > 0 && (
            <ul className="gap-4 flex-col flex my-4">
              {comments?.map((comment) => (
                <div
                  key={comment.createdAt}
                  className="card w-96 bg-base-100 w-full shadow-xl"
                >
                  <div className="card-body">
                    <p>{comment.body}</p>
                  </div>
                  <div className="divider" />
                  <div className="card-footer flex justify-between p-4 items-center">
                    <div>{comment.author.username}</div>

                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="btn btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="pb-8">
          <Link className="link" href={"/sign-in"}>
            {" "}
            Sign in{" "}
          </Link>
          or
          <Link className="link" href={"/register"}>
            {" "}
            sign up{" "}
          </Link>
          to add comments on this article.
        </div>
      )}
    </div>
  );
}

function ProfileSection(article: Article, setArticles: any) {
  const router = useRouter();
  const context = useContext(AuthContext);

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
    <div className="flex gap-2 items-center  justify-center">
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
