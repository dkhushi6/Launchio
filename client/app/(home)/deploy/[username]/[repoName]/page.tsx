"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Pencil, Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DeploymentSuccess from "@/components/hero-section/deployment-success";
import BuildLogs from "@/components/hero-section/build-logs";
import UserRepoCard from "@/components/hero-section/user-repo-card";
import { fetchUserRepo } from "@/app/functions/fetch-user-repo";
import { startDeployment } from "@/app/functions/start-deployment";
import { EnvVarType, Item, Repo } from "@/lib/types/client-types";
import { fetchFolderContent } from "@/app/functions/fetch-folder-content";
import FolderTree from "@/components/folder-tree";
import { Input } from "@/components/ui/input";

const page = () => {
  const { data: session } = useSession();
  const [repo, setRepo] = useState<Repo | null>(null);
  const [deployMode, setDeployMode] = useState(false);
  const [editRootDirMode, setEditRootDirMode] = useState(false);
  const [envVars, setEnvVars] = useState<EnvVarType[]>([]);
  const [newEnvKey, setNewEnvKey] = useState("");
  const [newEnvValue, setNewEnvValue] = useState("");

  const [deployUrl, setDeployUrl] = useState("");
  const [hasError, setHasError] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { username, repoName } = useParams();
  const currUsername = session?.user?.username;
  const [repoNotFound, setRepoNotFound] = useState(false);
  const [items, setItems] = useState<Record<string, Item> | null>(null);
  const [rootDir, setRootDir] = useState("./");
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
      <div>
        <p className="text-[15px] text-muted-foreground  mb-1">
          Root Directory
        </p>
        <div className="flex gap-2">
          <Input
            className="mb-1"
            value={rootDir}
            onChange={(e) => setRootDir(e.target.value)}
          />
          {!editRootDirMode && (
            <Button
              variant="outline"
              disabled={deployMode}
              onClick={() => {
                setEditRootDirMode(true);
              }}
            >
              {" "}
              <Pencil />
            </Button>
          )}
        </div>
        {editRootDirMode && items && Object.keys(items).length > 0 && (
          <FolderTree
            items={items}
            setRootDir={setRootDir}
            setEditRootDirMode={setEditRootDirMode}
          />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[15px] text-muted-foreground">
          Environment Variables
        </p>
        <div className="rounded-lg border overflow-hidden">
          {envVars.length > 0 && (
            <div className="divide-y">
              {envVars.map((env, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-muted/30"
                >
                  <span className="w-1/3 text-sm font-mono truncate">
                    {env.key}
                  </span>
                  <span className="flex-1 text-sm font-mono text-muted-foreground truncate">
                    {"*".repeat(Math.min(env.value.length, 16))}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setEnvVars((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    disabled={deployMode}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 p-2">
            <Input
              placeholder="KEY"
              className="font-mono text-sm h-8"
              value={newEnvKey}
              onChange={(e) => setNewEnvKey(e.target.value)}
              disabled={deployMode}
            />
            <Input
              placeholder="VALUE"
              className="font-mono text-sm h-8"
              value={newEnvValue}
              onChange={(e) => setNewEnvValue(e.target.value)}
              disabled={deployMode}
            />
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 shrink-0"
              disabled={deployMode || !newEnvKey.trim()}
              onClick={() => {
                if (!newEnvKey.trim()) return;
                setEnvVars((prev) => [
                  ...prev,
                  { key: newEnvKey.trim(), value: newEnvValue },
                ]);
                setNewEnvKey("");
                setNewEnvValue("");
              }}
            >
              <Plus size={17} />
            </Button>
          </div>
        </div>
      </div>
      {!deployUrl && (
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            startDeployment({
              setDeployMode,
              setLogs,
              setDeployUrl,
              setHasError,
              repo,
              username,
              currUsername,
              token: session?.user.accessToken,
              rootDir,
              envVars,
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
      {(deployMode || hasError || logs.length > 0) && <BuildLogs logs={logs} hasError={hasError} deployMode={deployMode} />}
      {deployUrl && <DeploymentSuccess deployUrl={deployUrl} />}
    </div>
  );
};

export default page;
