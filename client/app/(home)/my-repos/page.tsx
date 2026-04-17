"use client";

import UserRepoCard from "@/components/hero-section/user-repo-card";
import { Repo } from "@/lib/types/client-types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
