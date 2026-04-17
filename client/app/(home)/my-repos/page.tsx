"use client";

import { getUserRepos } from "@/app/functions/get-my-repos";
import UserRepoCard from "@/components/hero-section/user-repo-card";
import { Repo } from "@/lib/types/client-types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NotFound from "./not-found";

const UserRepos = () => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const token = session?.user?.accessToken;
    const username = session?.user?.username;

    if (!token) return;
    try {
      getUserRepos({ username, token, setRepos });
    } catch {
      NotFound();
    }
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
