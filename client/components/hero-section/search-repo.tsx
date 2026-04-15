"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import UserRepoCard from "./user-repo-card";
import { Repo } from "@/app/(home)/my-repos/page";
import { match } from "assert";
import { redirect } from "next/navigation";

const SearchRepo = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);

  const handleSearch = async () => {
    const urlFormate = /^https?:\/\/github\.com\/([^\/\s]+)\/([^\/\s]+)\/?$/;
    const match = query.match(urlFormate);
    if (match) {
      const username = match[1];
      const repoName = match[2];
      redirect(`/deploy/${username}/${repoName}`);
    } else {
      const res = await axios.post("http://localhost:8080/api/search-repo", {
        repoName: query,
      });
      setRepos(res.data.results);
      console.log("repos are", res.data.results);
    }
  };

  return (
    <div className=" mb-6 ">
      <div className="flex gap-3">
        {" "}
        <Input
          type="text"
          placeholder="Enter Github url or repo name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
        <Button onClick={handleSearch} className="px-5 py-3">
          Search Repo
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
        {repos.map((repo) => (
          <UserRepoCard key={repo.id} repo={repo} />
        ))}
      </div>{" "}
    </div>
  );
};

export default SearchRepo;
