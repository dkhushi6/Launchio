"use client";
import { Card } from "../ui/card";
import { redirect } from "next/navigation";
import { Repo } from "@/app/(home)/my-repos/page";
import { useSession } from "next-auth/react";

type UserRepoCardTypeProps = {
  repo: Repo;
};

const UserRepoCard = ({ repo }: UserRepoCardTypeProps) => {
  const { data: session } = useSession();
  const updatedAt = new Date(repo.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card
      onClick={async () => {
        redirect(`/deploy/${session?.user.username}/${repo.name}`);
      }}
      key={repo.id}
      className="p-6  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-lg font-semibold truncate">{repo.name}</h2>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ml-2 ${
              repo.private
                ? "bg-red-100 dark:bg-red-950 text-red-600"
                : "bg-green-100 dark:bg-green-950 text-green-600"
            }`}
          >
            {repo.private ? "Private" : "Public"}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-sm text-gray-500">{repo.owner.login}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 min-h-10">
          {repo.description || "No description provided"}
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-4">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            <span>👁️ {repo.watchers_count}</span>
            {repo.open_issues_count > 0 && (
              <span className="text-amber-500">
                ● {repo.open_issues_count} issues
              </span>
            )}
          </div>
          <span className="font-medium">{repo.language || "N/A"}</span>
        </div>

        <p className="text-xs text-gray-400 mb-4">Updated {updatedAt}</p>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-block text-sm font-medium text-muted-foreground hover:underline"
        >
          View Repository →
        </a>
      </div>
    </Card>
  );
};

export default UserRepoCard;
