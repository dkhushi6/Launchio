"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DeploymentSuccess from "@/components/hero-section/deployment-success";
import BuildLogs from "@/components/hero-section/build-logs";
import UserRepoCard from "@/components/hero-section/user-repo-card";
import { fetchUserRepo } from "@/app/functions/fetch-user-repo";
import { startDeployment } from "@/app/functions/start-deployment";
import { Item, Repo } from "@/lib/types/client-types";
import { fetchFolderContent } from "@/app/functions/fetch-folder-content";
import FolderTree from "@/components/folder-tree";

const page = () => {
  const { data: session } = useSession();
  const [repo, setRepo] = useState<Repo | null>(null);
  const [deployMode, setDeployMode] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const { username, repoName } = useParams();
  const currUsername = session?.user?.username;
  const [repoNotFound, setRepoNotFound] = useState(false);
  const [items, setItems] = useState<Record<string, Item> | null>(null);
  useEffect(() => {
    if (!username || !repoName || !currUsername) return;

    (async () => {
      try {
        const data = await fetchUserRepo({
          username: username as string,
          currUsername,
          repoName: repoName as string,
          token: session?.user?.accessToken,
        });
        setRepo(data);
      } catch {
        setRepoNotFound(true);
      }
    })();
    (async () => {
      try {
        const isOwner = username === currUsername;

        const itemsInfo = await fetchFolderContent({
          username: username as string,
          repoName: repoName as string,
          token: isOwner ? session?.user?.accessToken : undefined,
        });
        setItems(itemsInfo);
        console.log(itemsInfo);
      } catch {
        console.error("fetching foldertree error");
      }
    })();
  }, [username, repoName, currUsername, session]);
  if (repoNotFound) return notFound();

  if (!repo) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <LoaderCircle
          className="animate-spin text-muted-foreground"
          size={24}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
          Deploying
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{repo.name}</h1>
      </div>
      <UserRepoCard repo={repo} />
      {items && Object.keys(items).length > 0 && <FolderTree items={items} />}
      {!deployUrl && (
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            startDeployment({
              setDeployMode,
              setLogs,
              setDeployUrl,
              repo,
              username,
              currUsername,
              token: session?.user.accessToken,
            });
          }}
          disabled={deployMode}
        >
          {deployMode ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" size={14} />
              Deploying...
            </span>
          ) : (
            "Deploy"
          )}
        </Button>
      )}
      {deployMode && <BuildLogs logs={logs} />}
      {deployUrl && <DeploymentSuccess deployUrl={deployUrl} />}
    </div>
  );
};

export default page;
