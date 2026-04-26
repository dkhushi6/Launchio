import { Repo } from "@/lib/types/client-types";
import axios from "axios";
import { toast } from "sonner";
type fetchUserRepoPropTypes = {
  username: string;
  currUsername: string;
  repoName: string;
  token?: string;
};
export const fetchUserRepo = async ({
  username,
  currUsername,
  repoName,
  token,
}: fetchUserRepoPropTypes) => {
  const isOwner = username === currUsername;

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_URL}${isOwner ? "/api/get-repo" : "/api/get-public-repo"}`,
    isOwner ? { username, repoName, token } : { username, repoName },
  );

  if (!res.data.repo) {
    toast.error("Repository not found");
    throw new Error("Repo not found");
  }
  return res.data.repo;
};
