
import { SearchParams, SearchResponse, Repository, User, Issue, Contributor } from "../types";

const BASE_URL = "https://api.github.com";

// Helper function to build query parameters
const buildQueryParams = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
};

// Search repositories
export const searchRepositories = async (params: SearchParams): Promise<SearchResponse<Repository>> => {
  const queryParams = buildQueryParams(params);
  const response = await fetch(`${BASE_URL}/search/repositories?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};

// Search users
export const searchUsers = async (params: {q: string, page: number, per_page: number}): Promise<SearchResponse<User>> => {
  // Format query for searching users
  const query = params.q ? `${params.q} type:user` : '';
  
  const queryParams = buildQueryParams({
    q: query,
    page: params.page,
    per_page: params.per_page
  });
  
  const response = await fetch(`${BASE_URL}/search/users?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};

// Get repository details
export const getRepository = async (owner: string, repo: string): Promise<Repository> => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};

// Get repository issues
export const getRepositoryIssues = async (owner: string, repo: string, state?: string): Promise<Issue[]> => {
  const params = buildQueryParams({ state: state || "all", per_page: 100 });
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/issues?${params}`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};

// Get repository contributors
export const getRepositoryContributors = async (owner: string, repo: string): Promise<Contributor[]> => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/contributors?per_page=10`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};

// Get user details
export const getUser = async (username: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};

// Get user repositories
export const getUserRepositories = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=10`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};

// Get user followers
export const getUserFollowers = async (username: string): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users/${username}/followers?per_page=10`);
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
};
