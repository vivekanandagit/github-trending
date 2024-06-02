import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import RepoList from "./RepoList";

jest.mock("axios");

const mockRepos = [
  {
    id: 1,
    name: "Repo 1",
    html_url: "https://github.com/repo1",
    description: "Description for Repo 1",
    stargazers_count: 100,
    language: "JavaScript",
  },
  {
    id: 2,
    name: "Repo 2",
    html_url: "https://github.com/repo2",
    description: "Description for Repo 2",
    stargazers_count: 200,
    language: "Python",
  },
];

test("fetches and displays repositories", async () => {
  axios.get.mockResolvedValue({ data: { items: mockRepos } });

  render(<RepoList />);

  await waitFor(() => {
    expect(screen.getByText("Repo 1")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Repo 2")).toBeInTheDocument();
  });
});

test("stars and unstars a repository", async () => {
  axios.get.mockResolvedValue({ data: { items: mockRepos } });

  render(<RepoList />);

  await waitFor(() => {
    expect(screen.getByText("Repo 1")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Repo 2")).toBeInTheDocument();
  });

  const starButton = screen.getAllByText("Star")[0];
  fireEvent.click(starButton);
  expect(starButton).toHaveTextContent("Unstar");

  fireEvent.click(starButton);
  expect(starButton).toHaveTextContent("Star");
});

test("filters repositories by language", async () => {
  axios.get.mockResolvedValue({ data: { items: mockRepos } });

  render(<RepoList />);

  await waitFor(() => {
    expect(screen.getByText("Repo 1")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Repo 2")).toBeInTheDocument();
  });

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "JavaScript" },
  });

  await waitFor(() => {
    expect(screen.getByText("Repo 1")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Repo 2")).not.toBeInTheDocument();
  });
});
