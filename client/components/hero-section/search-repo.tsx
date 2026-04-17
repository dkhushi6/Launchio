"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import UserRepoCard from "./user-repo-card";

import { handleSearch } from "@/app/functions/handle-hero-search";
import { Repo } from "@/lib/types/client-types";

const SearchRepo = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);

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
        <Button
          onClick={() => {
            handleSearch({ query, setRepos });
          }}
          className="px-5 py-3"
        >
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
