import React, { useEffect, useState } from "react";
import { Card, Button, List, Select } from "antd";
import { fetchTrendingRepositories } from "../services/githubService";

const { Option } = Select;

const RepoList = ({ filterStarred }) => {
  const [repos, setRepos] = useState([]);
  const [starredRepos, setStarredRepos] = useState(new Set());
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      const formattedDate = date.toISOString().split("T")[0];
      const data = await fetchTrendingRepositories(formattedDate);
      setRepos(data);
    };

    fetchData();
  }, []);

  const toggleStar = (repo) => {
    const newStarredRepos = new Set(starredRepos);
    if (starredRepos.has(repo.id)) {
      newStarredRepos.delete(repo.id);
    } else {
      newStarredRepos.add(repo.id);
    }
    setStarredRepos(newStarredRepos);
    localStorage.setItem(
      "starredRepos",
      JSON.stringify(Array.from(newStarredRepos))
    );
  };

  useEffect(() => {
    const storedStarredRepos =
      JSON.parse(localStorage.getItem("starredRepos")) || [];
    setStarredRepos(new Set(storedStarredRepos));
  }, []);

  const filteredRepos = repos
    .filter((repo) => !filterStarred || starredRepos.has(repo.id))
    .filter((repo) => !language || repo.language === language);

  return (
    <>
      <Select
        value={language}
        onChange={setLanguage}
        style={{ marginBottom: 16, width: 200 }}
      >
        <Option value="">All Languages</Option>
        {[...new Set(repos.map((repo) => repo.language))].map((lang) => (
          <Option key={lang} value={lang}>
            {lang}
          </Option>
        ))}
      </Select>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={filteredRepos}
        renderItem={(repo) => (
          <List.Item>
            <Card
              title={repo.name}
              extra={
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              }
            >
              <p>{repo.description}</p>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Language: {repo.language}</p>
              <Button onClick={() => toggleStar(repo)}>
                {starredRepos.has(repo.id) ? "Unstar" : "Star"}
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default RepoList;
