"use server";

import { execSync, spawn } from "child_process";
import path from "path";
import fs from "fs";
type deployContainerPropTypes = {
  clone_url: string;
  rootDir: string;
  token?: string;
};
const deployContainer = async ({
  clone_url,
  rootDir,
  token,
}: deployContainerPropTypes) => {
  console.log("before block");

  console.log("creating the cloning......");

  const outputDir = path.join(process.cwd(), "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  let dockerCmd;
  if (token) {
    dockerCmd = `
docker run --rm \
-e REPO_URL=${clone_url} \
-e GITHUB_TOKEN=${token} \
-v ${outputDir}:/output \
builder-image
`;
  } else {
    dockerCmd = `
docker run --rm \
-e REPO_URL=${clone_url} \
-v ${outputDir}:/output \
builder-image
`;
  }

  execSync(dockerCmd, {
    stdio: "inherit",
  });
  console.log("repo clonned successfully");

  console.log("docker cloning done");

  console.log("docker contaner is running ");
};

export default deployContainer;
