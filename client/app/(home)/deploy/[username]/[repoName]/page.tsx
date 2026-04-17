"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Repo } from "../../../my-repos/page";
import DeploymentSuccess from "@/components/hero-section/deployment-success";
import BuildLogs from "@/components/hero-section/build-logs";
import UserRepoCard from "@/components/hero-section/user-repo-card";
import { fetchUserRepo } from "@/app/functions/fetch-user-repo";
import { startDeployment } from "@/app/functions/start-deployment";

const page = () => {
  const { data: session } = useSession();
  const [repo, setRepo] = useState<Repo | null>(null);
  const [deployMode, setDeployMode] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const { username, repoName } = useParams();
  const currUsername = session?.user?.username;

  useEffect(() => {
    const token = session?.user?.accessToken;

    if (!username || !repoName || !currUsername) return;
    if (token) {
      fetchUserRepo({
        username: username as string,
        currUsername,
        repoName: repoName as string,
        token,
        setRepo,
      });
    } else {
      fetchUserRepo({
        username: username as string,
        currUsername,
        repoName: repoName as string,
        token,
        setRepo,
      });
    }
  }, [username, repoName, currUsername, session]);

  // const startDeployment = async () => {
  //   setDeployMode(true);
  //   setLogs([
  //     "$ initializing deployment...",
  //     "$ cloning repository...",
  //     "$ installing dependencies...",
  //     "$ running build...",
  //   ]);
  //   const socket = new WebSocket("ws://localhost:8080");

  //   socket.onopen = () => {
  //     console.log("socket connected");

  //     socket.send(
  //       JSON.stringify({
  //         type: "start",
  //         clone_url: repo!.clone_url,
  //         token:
  //           username === currUsername ? session?.user.accessToken : undefined,
  //       }),
  //     );
  //   };
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);

  //     if (data.type === "log") {
  //       setLogs((prev) => [...prev, data.message]);
  //     }

  //     if (data.type === "error") {
  //       setLogs((prev) => [...prev, `ERROR: ${data.message}`]);
  //     }

  //     if (data.type === "hosted_url") {
  //       setDeployUrl(data.url);
  //       setDeployMode(false);
  //     }
  //   };

  //   socket.onclose = () => {
  //     console.log("socket closed");
  //   };
  // };

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
