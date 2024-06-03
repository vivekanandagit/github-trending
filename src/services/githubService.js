import axios from "axios";

export const fetchTrendingRepositories = async (date) => {
  const response = await axios.get(
    `https://api.github.com/search/repositories?q=created:${date}&sort=stars&order=desc`
  );
  return response.data.items;
};
