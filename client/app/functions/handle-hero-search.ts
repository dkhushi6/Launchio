import { Repo } from "@/lib/types/client-types";
import axios from "axios";
import { redirect } from "next/navigation";

type handleSearchPropTypes = {
  query: string;
  setRepos: React.Dispatch<React.SetStateAction<Repo[]>>;
};
export const handleSearch = async ({
  query,
  setRepos,
}: handleSearchPropTypes) => {
  const urlFormate = /^https?:\/\/github\.com\/([^\/\s]+)\/([^\/\s]+)\/?$/;
  const match = query.match(urlFormate);
  if (match) {
    const username = match[1];
    const repoName = match[2];
    redirect(`/deploy/${username}/${repoName}`);
  } else {
    const res = await axios.post("http://localhost:8080/api/search-repo", {
      repoName: query,
    });
    setRepos(res.data.results);
    console.log("repos are", res.data.results);
  }
};
