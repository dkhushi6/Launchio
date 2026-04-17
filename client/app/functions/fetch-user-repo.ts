import axios from "axios";
import { Repo } from "../(home)/my-repos/page";
type fetchUserRepoPropTypes = {
  username: string;
  currUsername: string;
  repoName: string;
  token?: string;
  setRepo: React.Dispatch<React.SetStateAction<Repo | null>>;
};
export const fetchUserRepo = async ({
  username,
  currUsername,
  repoName,
  token,
  setRepo,
}: fetchUserRepoPropTypes) => {
  if (username === currUsername) {
    const res = await axios.post("http://localhost:8080/api/get-repo", {
      username,
      repoName,
      token,
    });
    setRepo(res.data.repo);
  } else {
    const res = await axios.post("http://localhost:8080/api/get-public-repo", {
      username,
      repoName,
    });
    setRepo(res.data.repo);
  }
};
