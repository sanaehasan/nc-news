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
  return api.get("/topics").then(({ data }) => {
    return data;
  });
};

export { getArticles, getTopics };
