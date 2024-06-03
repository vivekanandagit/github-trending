import React, { useEffect, useState } from "react";
import { Card, Button, Select } from "antd";
import styled from "styled-components";
import { fetchTrendingRepositories } from "../services/githubService";

const { Option } = Select;

const Container = styled.div`
  padding: 20px;
`;

const LanguageSelect = styled(Select)`
  margin-bottom: 16px;
  width: 200px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const RepoCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;

  .ant-card-head {
    background-color: #e6f4ff;
  }

  .ant-card-extra a {
    color: #1890ff;
  }

  p {
    margin: 8px 0 25px 0;
  }
`;

const StarButton = styled(Button)`
  margin-top: 10px;
  background-color: ${(props) => (props.starred ? "#ff4d4f" : "#1890ff")};
  color: white;
  border: none;
  position: absolute;
  bottom: 10px;

  &:hover {
    background-color: ${(props) => (props.starred ? "#ff7875" : "#40a9ff")};
  }
`;

const RepoList = ({ filterStarred }) => {
  const [repos, setRepos] = useState([]);
  const [starredRepos, setStarredRepos] = useState(new Set());
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      date.setDate(date.getDate() - 7); // setting 7 days back to get variety of repos
      const [formattedDate] = date.toISOString().split("T");
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
    <Container>
      <LanguageSelect value={language} onChange={setLanguage}>
        <Option value="">All Languages</Option>
        {[...new Set(repos.map((repo) => repo.language))].map((lang) => (
          <Option key={lang} value={lang}>
            {lang}
          </Option>
        ))}
      </LanguageSelect>
      <GridContainer>
        {filteredRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            title={repo.name}
            extra={
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            }
          >
            <p>{repo.description}</p>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Language: {repo.language}</p>
            <StarButton
              starred={starredRepos.has(repo.id)}
              onClick={() => toggleStar(repo)}
            >
              {starredRepos.has(repo.id) ? "Unstar" : "Star"}
            </StarButton>
          </RepoCard>
        ))}
      </GridContainer>
    </Container>
  );
};

export default RepoList;
