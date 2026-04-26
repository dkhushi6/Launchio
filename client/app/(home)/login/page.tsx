"use client";
import { Button } from "../../../components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoaderCircle, Zap, Lock, Globe } from "lucide-react";
import Logo from "@/components/logo";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const page = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen  text-center">
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            {" "}
            <Logo size={60} />
          </div>
          <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-widest mb-6 mt-2">
            Launchio
          </p>
          <div className="my-8 ">
            <h1 className="text-lg  tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Connect your GitHub account to start deploying
            </p>
          </div>

          <Button
            className="w-full flex items-center gap-2"
            variant="outline"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              signIn("github", { callbackUrl: "/" });
            }}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" size={14} />
            ) : (
              <GithubIcon />
            )}
            {loading ? "Redirecting to GitHub..." : "Continue with GitHub"}
          </Button>

          <p className="text-[11px] text-muted-foreground text-center mt-6 leading-relaxed">
            We only request read access to your repositories.
            <br />
            Your code never touches our servers unless you deploy it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
