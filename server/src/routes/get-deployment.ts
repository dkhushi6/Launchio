import Router from "express";
import { UploadFiles } from "../../lib/aws/upload";
import path from "path";
import { ObjectId } from "bson";
import deployContainer from "../../lib/aws/docker/deploy-container";
const router = Router();
router.post("/", async (req, res) => {
  const { clone_url, token } = req.body;
  if (!clone_url) {
    console.log("no ssh url");
    return;
  }
  let app_id;
  try {
    // if (token) {
    //   await deployContainer({ clone_url, token });
    // } else {
    //   await deployContainer({ clone_url });
    // }

    app_id = new ObjectId().toHexString();
    console.log("in try block get-deployment");
    const distPath = path.join(process.cwd(), "output/dist");
    await UploadFiles(distPath, app_id);
    const websiteURL = `https://${app_id}-vercel.khushii.space`;

    console.log("Deployment successful!");
    console.log("Website URL:", websiteURL);
  } catch (err) {
    console.error("Deployment failed:", err);
  }
  return res.json({ url: `https://${app_id}-vercel.khushii.space` });
});
export default router;
