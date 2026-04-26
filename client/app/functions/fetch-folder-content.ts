import axios from "axios";
type fetchFolderContentPropType = {
  username: string;
  repoName: string;
  token?: string | undefined;
};
export const fetchFolderContent = async ({
  username,
  repoName,
  token,
}: fetchFolderContentPropType) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/get-folder-tree`,
      {
        username,
        repoName,
        token: token ?? null,
      },
    );
    return res.data.results;
  } catch (error) {
    console.error("error fetching folder tree");
    throw error;
  }
};
