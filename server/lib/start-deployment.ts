import { ObjectId } from "bson";
import path from "path";
import { UploadFiles } from "./aws/upload";
import { WebSocket } from "ws";
import { deployDockerContainer } from "./docker/docker-deploy";

type startDeploymentPropTypes = {
  ws: WebSocket;
  clone_url: string;
  token?: string;
};
export const startDeployment = async ({
  ws,
  clone_url,
  token,
}: startDeploymentPropTypes) => {
  if (!clone_url) {
    console.log("no ssh url");
    return;
  }
  let app_id;
  try {
    if (token) {
      await deployDockerContainer({ ws, clone_url, token });
    } else {
      await deployDockerContainer({ ws, clone_url });
    }
    ws.send(JSON.stringify({ type: "stage", value: "build_done" }));

    app_id = new ObjectId().toHexString();
    console.log("in try block get-deployment");
    const distPath = path.join(process.cwd(), "output/dist");
    await UploadFiles(distPath, app_id);
    ws.send(JSON.stringify({ type: "stage", value: "upload_done" }));
    const websiteURL = `https://${app_id}-vercel.khushii.space`;
    ws.send(
      JSON.stringify({
        type: "hosted_url",
        url: websiteURL,
      }),
    );
    console.log("Deployment successful!");
    console.log("Website URL:", websiteURL);
    if (ws.readyState === ws.OPEN) {
      ws.close();
    }
  } catch (err) {
    console.error("Deployment failed:", err);
  }
  return { url: `https://${app_id}-vercel.khushii.space` };
};
