import { Repo } from "@/lib/types/client-types";
import axios from "axios";
type getUserReposPropsTypes = {
  username: string | undefined;
  token: string;
  setRepos: React.Dispatch<React.SetStateAction<Repo[]>>;
};
export const getUserRepos = async ({
  username,
  token,
  setRepos,
}: getUserReposPropsTypes) => {
  try {
    const res = await axios.post("http://localhost:8080/api/get-repos", {
      username,
      token,
    });
    setRepos(res.data.repos);
  } catch {
    throw new Error("Repos not found");
  }
};
