type handleCopyPropsType = {
  deployUrl: string;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
};
export const handleCopy = ({ deployUrl, setCopied }: handleCopyPropsType) => {
  navigator.clipboard.writeText(deployUrl);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};
