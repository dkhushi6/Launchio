import axios from "axios";
import Router from "express";
import { buildItems } from "../../lib/builder-tree";
const router = Router();
router.post("/get-folder-tree", async (req, res) => {
  try {
    const { username, repoName, token } = req.body;
    if (!username) {
      console.log("no username");
      return;
    }

    if (!repoName) {
      console.log("no repoName");
      return;
    }
    const headers: any = {
      Accept: "application/vnd.github+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const repo = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}`,
      { headers },
    );

    const branch = repo.data.default_branch;

    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}/git/trees/${branch}?recursive=1`,
      { headers },
    );
    const structured = buildItems(response.data.tree);

    return res.json({ success: true, results: structured });
  } catch (error: any) {
    console.error(
      "get-folder-tree error:",
      error?.response?.data || error?.message || error,
    );
    return res.status(500).json({ message: error?.message });
  }
});
export default router;
