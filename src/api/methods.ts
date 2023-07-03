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

export const createNewArticle = ({
  title,
  body,
  description,
  tagList,
  token,
}: {
  title: string;
  body: string;
  description: string;
  tagList: string[];
  token: string | undefined;
}) =>
  fetch("https://api.realworld.io/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({
      article: {
        title,
        body,
        description,
        tagList,
      },
    }),
  });

// user
export const createUser = ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) =>
  fetch("https://api.realworld.io/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
        username,
      },
    }),
  });
export const updateUser = ({
  email,
  password,
  username,
  token,
  bio,
  image,
}: {
  email: string | undefined;
  password: string | undefined;
  bio: string | undefined;
  image: string | undefined;

  token: string | undefined;
  username: string | undefined;
}) =>
  fetch("https://api.realworld.io/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",

      Authorization: "Token " + token,
    },
    body: JSON.stringify({
      user: {
        bio,
        email,
        image,
        password,
        username,
      },
    }),
  });
export const signInUser = ({
  email,
  password,
}: {
  email: string | undefined;
  password: string | undefined;
}) =>
  fetch("https://api.realworld.io/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });

// articles and feed
export const fetchArticles = (offset: number) =>
  fetch(`https://api.realworld.io/api/articles?limit=10&offset=${offset}`);
export const fetchFeed = (offset: number, token: string | undefined) =>
  fetch(
    `https://api.realworld.io/api/articles/feed?limit=10&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Token " + token,
      },
    }
  );
