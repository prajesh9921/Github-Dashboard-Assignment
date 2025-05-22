
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  owner: User;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
  location?: string;
  company?: string;
  blog?: string;
  email?: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  user: User;
  created_at: string;
  updated_at: string;
  body: string;
  labels: Label[];
}

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface SearchParams {
  q: string;
  sort?: "stars" | "forks" | "updated";
  order?: "asc" | "desc";
  page: number;
  per_page: number;
}

export interface SearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}
