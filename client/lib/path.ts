export const HomePath = () => "/";
export const LoginPath = () => "/login";
export const MyReposPath = () => "/my-repos";
type DeployPageUserPathType = {
  username: string | undefined;
  repoName: string;
};
export const DeployPageUserPath = ({
  username,
  repoName,
}: DeployPageUserPathType) => {
  return `/deploy/${username}/${repoName}`;
};
