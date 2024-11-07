import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-backend-news.onrender.com/api",
});

const getArticles = (sort_by, order, topic) => {
  return api
    .get("/articles", {
      params: {
        sort_by: sort_by,
        order: order,
        topic: topic,
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      // handle error
      return error;
    });
};

const getTopics = () => {
  return api
    .get("/topics")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      // handle error
      return Promise.reject({ msg: "error loading topics" });
    });
};
const getArticleById = (id) => {
  return api
    .get(`/articles/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      // handle error

      return Promise.reject({ msg: "article not found" });
    });
};
const getArticleCommentsById = (id) => {
  return api
    .get(`/articles/${id}/comments`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      // handle error
      return Promise.reject({ msg: "comments not found" });
    });
};
const UpdateArticleVotes = (article_id, vote) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      // handle error
      return Promise.reject({ msg: "Unable to update votes try again later " });
    });
};
const getUsers = () => {
  return api
    .get("/users")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      // handle error
      return Promise.reject({ msg: "Not able to load users ty again later" });
    });
};

const addComment = (commentText, username, article_id) => {
  return api
    .post(`/articles/${article_id}/comments`, {
      username: username,
      body: { body: commentText },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      // handle error
      return Promise.reject({ msg: "Error adding comment try again later" });
    });
};
const deleteComment = (comment_id) => {
  return api
    .delete(`/comments/${comment_id}`)
    .then((data) => {
      return "deleted";
    })
    .catch((error) => {
      // handle error
      return Promise.reject({ msg: "error deleting comment" });
    });
};
export {
  getArticles,
  getTopics,
  getArticleCommentsById,
  getArticleById,
  UpdateArticleVotes,
  getUsers,
  addComment,
  deleteComment,
};
