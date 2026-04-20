import { EnvVarType, Repo } from "@/lib/types/client-types";
import { ParamValue } from "next/dist/server/request/params";

type startDeploymentPropTypes = {
  setDeployMode: React.Dispatch<React.SetStateAction<boolean>>;
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setDeployUrl: React.Dispatch<React.SetStateAction<string>>;
  repo: Repo;
  username: ParamValue;
  currUsername: string | undefined;
  token?: string;
  rootDir: string;
  envVars: EnvVarType[];
};
export const startDeployment = async ({
  setDeployMode,
  setLogs,
  setDeployUrl,
  repo,
  username,
  currUsername,
  token,
  rootDir,
  envVars,
}: startDeploymentPropTypes) => {
  setDeployMode(true);
  setLogs([
    "$ initializing deployment...",
    "$ cloning repository...",
    "$ installing dependencies...",
    "$ running build...",
  ]);
  const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);

  socket.onopen = () => {
    console.log("socket connected");

    socket.send(
      JSON.stringify({
        type: "start",
        clone_url: repo!.clone_url,
        token: username === currUsername ? token : undefined,
        rootDir,
        envVars,
      }),
    );
  };
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "log") {
      setLogs((prev) => [...prev, data.message]);
    }

    if (data.type === "error") {
      setLogs((prev) => [...prev, `ERROR: ${data.message}`]);
    }

    if (data.type === "hosted_url") {
      setDeployUrl(data.url);
      setDeployMode(false);
    }
  };

  socket.onclose = () => {
    console.log("socket closed");
  };
  return () => socket.close();
};
