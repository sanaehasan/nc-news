import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-backend-news.onrender.com/api",
});

const getArticles = (sort_by, order, topic) => {
  return api
    .get("/articles")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      // handle error
      console.error(error);
    });
};

export { getArticles };
