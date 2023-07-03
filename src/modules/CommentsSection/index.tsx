import {Article} from "@/app/page";
import React, {useEffect, useState} from "react";
import {deleteArticleComments, getArticleComments, postArticleComments} from "@/api/methods";
import Link from "next/link";
import Loading from "@/components/Loading";

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
const [isFetchingComments,setIsFetchingComments]=useState(false)
    const [comments, setComments] = useState<CommentShape[] | null>(null);
    const token = context?.user?.token;
    const onChange = (e: any) => {
        const { value } = e.target;
        setBody(value);
    };

    const postComment = () => {
        setLoading(true);
        postArticleComments({
            slug: article.slug,
            body,
            token,
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
        deleteArticleComments({
            slug: article.slug,
            commentId,
            token,
        })
            .then((res) => res.json())
            .then(( ) => {
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
        setIsFetchingComments(true);
        getArticleComments({ slug: article.slug, token: context.user?.token })
            .then((res) => res.json())
            .then((data) => {
                setComments(data?.comments);
            }).finally(()=>{


            setIsFetchingComments(false);

        })
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

                    {isFetchingComments?<div className={'flex justify-center py-8'}><Loading/></div>: comments && comments?.length > 0 && (
                        <div className="gap-4 flex-col flex my-4">
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
                        </div>
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
export  default  CommentsSection
