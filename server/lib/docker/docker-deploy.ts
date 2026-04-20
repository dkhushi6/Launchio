import { spawn } from "child_process";
import path from "path";
import { WebSocket } from "ws";
type deployContainerPropTypes = {
  ws: WebSocket;
  clone_url: string;
  rootDir: string;
  token?: string;
};
type LogMessage = {
  type: "log";
  message: string;
};

type ErrorMessage = {
  type: "error";
  message: string;
};
type WSMessage = LogMessage | ErrorMessage;

export const deployDockerContainer = ({
  ws,
  clone_url,
  rootDir,
  token,
}: deployContainerPropTypes): Promise<void> => {
  return new Promise((resolve, reject) => {
    const outputDir = path.join(process.cwd(), "output");

    const args = [
      "run",
      "--rm",
      "-e",
      `REPO_URL=${clone_url}`,
      "-e",
      `ROOT_DIR=${rootDir}`,
      ...(token ? ["-e", `GITHUB_TOKEN=${token}`] : []),
      "-v",
      `${outputDir}:/output`,
      "builder-image",
    ];

    const child = spawn("docker", args);
    child.stdout.on("data", (data: WSMessage) => {
      const logs = data.toString().split("\n");

      logs.forEach((log) => {
        if (!log.trim()) return;

        ws.send(
          JSON.stringify({
            type: "log",
            message: log,
          }),
        );
      });
    });

    child.stderr.on("data", (data: WSMessage) => {
      const errors = data.toString().split("\n");

      errors.forEach((err) => {
        if (!err.trim()) return;
        console.error("[docker stderr]", err);
        ws.send(
          JSON.stringify({
            type: "error",
            message: err,
          }),
        );
      });
    });
    child.on("close", (code) => {
      console.log("Process finished:", code);

      if (code === 0) resolve();
      else reject(new Error("Docker build failed"));
    });
  });
};
