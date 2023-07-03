export const getArticleInfo = ({
  slug,
  isAuthenticated,
  token,
}: {
  slug: string;
  isAuthenticated: boolean | undefined;
  token: string | undefined;
}) =>
  fetch("https://api.realworld.io/api/articles/" + slug, {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(isAuthenticated && {
        Authorization: "Token " + token,
      }),
    },
  });

export const postArticleComments = ({
  slug,
  body,
  token,
}: {
  slug: string;
  body: string;
  token: string | undefined;
}) =>
  fetch(`https://api.realworld.io/api/articles/${slug}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Token " + token,
    },

    body: JSON.stringify({
      comment: {
        body: body.trim(),
      },
    }),
  });
export const deleteArticleComments = ({
  slug,
  commentId,
  token,
}: {
  slug: string;
  commentId: number;
  token: string | undefined;
}) => {
  return fetch(
    `https://api.realworld.io/api/articles/${slug}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Token " + token,
      },
    }
  );
};
export const getArticleComments = ({
  slug,

  token,
}: {
  slug: string;

  token: string | undefined;
}) => {
  return fetch("https://api.realworld.io/api/articles/" + slug + "/comments", {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Token " + token,
    },
  });
};

export const likeOrUnlikeArticle = ({
  slug,
  favorited,
  token,
}: {
  slug: string;
  favorited: boolean;
  token: string | undefined;
}) =>
  fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
    method: favorited ? "DELETE" : "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Token " + token,
    },
  });
export const followOrUnFollowAuthor = ({
  username,
  following,
  token,
}: {
  username: string;
  following: boolean;
  token: string | undefined;
}) =>
  fetch(
    `
  https://api.realworld.io/api/profiles/${username}/follow`,
    {
      method: following ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Token " + token,
      },
    }
  );
