"use client";

import { createNewArticle } from "@/api/methods";
import Loading from "@/components/Loading";
import { AuthContext } from "@/app/contexts/AuthContext";

import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const isValid = (title: string, description: string, body: string) => {
  return !!title && !!description && !!body;
};

const Editor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const [tagName, setTagName] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [error, setError] = useState("");

  const context = useContext(AuthContext);
  const token = context?.user?.token;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onChange = (e: any) => {
    const { value } = e.target;

    if (e.target.name === "title") {
      setTitle(value);
    }
    if (e.target.name === "description") {
      setDescription(value);
    }
    if (e.target.name === "body") {
      setBody(value);
    }
    if (e.target.name === "tags") {
      setTagName(value);
    }
  };
  const onAddTag = (e: any) => {
    const { value } = e.target;

    if (!value.trim()) {
      return;
    }
    if (e.key === "Enter") {
      setTagList((tags) => [...tags, value.trim()]);
      setTagName("");
    }
  };

  const onSubmit = () => {
    setLoading(true);
    createNewArticle({ title, body, description, tagList, token })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setError(
            Object.entries(data.errors)
              .map((entry: [string, any]) => entry[0] + " " + entry[1][0])
              .join(", ")
          );
          setTimeout(() => {
            setError("");
          }, 1000);
        } else if (data?.article?.slug) {
          router.push(`/article/${data?.article?.slug}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!context?.isAuthenticated) {
      router.push("/sign-in");
    }
  }, [context?.isAuthenticated]);

  return (
    <div>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">New Article</h1>
          </div>
        </div>
      </div>{" "}
      <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
        <div className="flex flex-col gap-4 w-full">
          <div className="form-control ">
            <label className="input-group input-group-vertical">
              <span>Title</span>

              <input
                onChange={onChange}
                type="text"
                name="title"
                placeholder="Article Title"
                className="input input-bordered w-full"
                value={title}
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="input-group input-group-vertical">
              <span>Description</span>

              <input
                onChange={onChange}
                type="text"
                name="description"
                placeholder="What's this article about?"
                className="input input-bordered w-full"
                value={description}
              />
            </label>
          </div>
          <div className="form-control ">
            <label className="input-group input-group-vertical">
              <span>Body</span>

              <textarea
                className="w-full textarea resize-none"
                onChange={onChange}
                name="body"
                placeholder="What's your article?"
                value={body}
              ></textarea>
            </label>
          </div>
          <div className="form-control ">
            <label className="input-group input-group-vertical">
              <span>Tags</span>

              <input
                className="input input-bordered w-full"
                onKeyUp={onAddTag}
                onChange={onChange}
                type="text"
                name="tags"
                placeholder="Enter tags"
                value={tagName}
              />
            </label>{" "}
            {tagList.length > 0 && (
              <div className="flex my-4 flex-wrap gap-2 ">
                {tagList.map((tag) => (
                  <div className="badge badge-outline" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          className="btn btn-success"
          disabled={loading || !isValid(title, description, body)}
          onClick={onSubmit}
        >
          {loading && <Loading />}
          Publish article
        </button>{" "}
        <div className="toast toast-top toast-center">
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
