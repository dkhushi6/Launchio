"use client";

import UserRepoCard from "@/components/hero-section/user-repo-card";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
const UserRepos = () => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const token = session?.user?.accessToken;
    const username = session?.user?.username;

    if (!token) return;

    const getUserRepos = async () => {
      try {
        const res = await axios.post("http://localhost:8080/api/get-repos", {
          username,
          token,
        });
        console.log(res.data.repos);
        setRepos(res.data.repos);
      } catch (err) {
        console.error("Error fetching repos:", err);
      }
    };

    getUserRepos();
  }, [session]);

  return (
    <div className=" pt-5 px-6">
      <h1 className="text-3xl font-bold mb-6">Your Repositories</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <UserRepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default UserRepos;
