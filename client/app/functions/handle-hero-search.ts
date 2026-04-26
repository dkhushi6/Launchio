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
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/search-repo`,
      {
        repoName: query,
      },
    );
    const results: Repo[] = res.data.results;
    setRepos(results);
    return results;
  }
};
