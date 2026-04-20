export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  private: boolean;
  ssh_url: string;
  clone_url: string;
  watchers_count: number;
  updated_at: string;
  open_issues_count: number;

  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}
export type Item = {
  name: string;
  children?: string[];
};
