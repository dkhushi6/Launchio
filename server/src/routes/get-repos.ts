import axios from "axios";
import Router from "express";
const router = Router();
router.post("/get-repos", async (req, res) => {
  const { username, token } = req.body;
  if (!username) {
    console.log("no username");
    return;
  }
  const repos = await axios.get(
    `https://api.github.com/user/repos?per_page=100&page=1&sort=updated`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  return res.json({ success: true, repos: repos.data });
});
//get specific repo
router.post("/get-repo", async (req, res) => {
  const { username, repoName, token } = req.body;
  if (!username) {
    console.log("no username in specific repo");
    return;
  }
  if (!repoName) {
    console.log("no username");
    return;
  }
  if (!token) {
    console.log("no username");
    return;
  }
  const repo = await axios.get(
    `https://api.github.com/repos/${username}/${repoName}`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );
  return res.json({ success: true, repo: repo.data });
});
//get public repos
router.post("/search-repo", async (req, res) => {
  try {
    const { repoName } = req.body;

    if (!repoName) {
      return res.status(400).json({ message: "Repo name required" });
    }

    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${repoName}`,
    );

    return res.json({ success: true, results: response.data.items });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
router.post("/get-public-repo", async (req, res) => {
  try {
    const { username, repoName } = req.body;
    if (!username) {
      return res.status(400).json({ message: "username  required" });
    }
    if (!repoName) {
      return res.status(400).json({ message: "Repo name required" });
    }

    const repo = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}`,
    );

    return res.json({ success: true, repo: repo.data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
export default router;
