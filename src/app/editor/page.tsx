"use client";

import { AuthContext } from "@/contexts/AuthContext";

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

  const context = useContext(AuthContext);
  const router = useRouter();

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

    if (e.key === "Enter") {
      setTagList((tags) => [...tags, value]);
      setTagName("");
    }
  };

  const onSubmit = () => {
    fetch("https://api.realworld.io/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Token " + context?.user?.token,
      },
      body: JSON.stringify({
        article: {
          title,
          body,
          description,
          tagList,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.article?.slug) {
          router.push(`/article/${data?.article?.slug}`);
        }
      });
  };

  useEffect(() => {
    if (!context?.isAuthenticated) {
      router.push("/sign-in");
    }
  }, [context?.isAuthenticated]);

  return (
    <div className="flex flex-col gap-4">
      <input
        onChange={onChange}
        type="text"
        name="title"
        placeholder="Article Title"
        value={title}
      />
      <input
        onChange={onChange}
        type="text"
        name="description"
        placeholder="What's this article about?"
        value={description}
      />
      <input
        onChange={onChange}
        type="text"
        name="body"
        placeholder="What's your article?"
        value={body}
      />

      <input
        onKeyUp={onAddTag}
        onChange={onChange}
        type="text"
        name="tags"
        placeholder="Enter tags"
        value={tagName}
      />
      {tagList.length > 0 && (
        <ul>
          {tagList.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      <button
        className="disabled:opacity-50"
        disabled={!isValid(title, description, body)}
        onClick={onSubmit}
      >
        Publish article
      </button>
    </div>
  );
};

export default Editor;
