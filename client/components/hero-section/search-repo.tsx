"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import UserRepoCard from "./user-repo-card";
import { handleSearch } from "@/app/functions/handle-hero-search";
import { Repo } from "@/lib/types/client-types";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const SearchRepo = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async () => {
    if (!query.trim()) {
      toast.error("Please enter a repo name or GitHub URL");
      return;
    }
    try {
      setLoading(true);
      const results = await handleSearch({ query, setRepos });
      if (results && results.length === 0) {
        toast.error("No repositories found");
      }
    } catch {
      toast.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mb-6 ">
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="Enter Github url or repo name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
        <Button onClick={onSearch} disabled={loading} className="px-5 py-3">
          {loading ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" size={14} />
              Searching...
            </span>
          ) : (
            "Search Repo"
          )}
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
        {repos.map((repo) => (
          <UserRepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default SearchRepo;
