import { spawn } from "child_process";
import path from "path";
import { WebSocket } from "ws";
type deployContainerPropTypes = {
  ws: WebSocket;
  clone_url: string;
  rootDir: string;
  envVars: { key: string; value: string }[];
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
  envVars,
  token,
}: deployContainerPropTypes): Promise<void> => {
  return new Promise((resolve, reject) => {
    const outputDir = path.join(process.cwd(), "output");
    const envArgs = envVars.flatMap(({ key, value }) => [
      "-e",
      `${key}=${value}`,
    ]);
    const args = [
      "run",
      "--rm",
      "-e",
      `REPO_URL=${clone_url}`,
      "-e",
      `ROOT_DIR=${rootDir}`,
      ...(token ? ["-e", `GITHUB_TOKEN=${token}`] : []),
      ...envArgs,
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
      const lines = data.toString().split("\n");

      lines.forEach((line) => {
        if (!line.trim()) return;
        console.error("[docker stderr]", line);
        ws.send(
          JSON.stringify({
            type: "log",
            message: line,
          }),
        );
      });
    });
    child.on("close", (code) => {
      console.log("Process finished:", code);

      if (code === 0) resolve();
      else {
        ws.send(JSON.stringify({ type: "error", message: "Docker build failed with exit code " + code }));
        reject(new Error("Docker build failed"));
      }
    });
  });
};
