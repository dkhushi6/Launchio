"use client";
import { Button } from "../../../components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const page = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className=" flex justify-center items-center h-screen ">
      <div className=" border rounded-lg flex px-5 py-8">
        <div className="text-center">
          <div className="text-xl font-semibold">Welcome</div>
          <div className="text-[#7a7a7a] text-[13px]">
            Login with your Github account
          </div>
          <div>
            <div className="py-5">
              <Button
                className="flex gap-3 w-[50vh] "
                variant="outline"
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  signIn("github", { callbackUrl: "/" });
                }}
              >
                <div className="flex gap-3 items-center">
                  {loading && <LoaderCircle className="animate-spin" size={16} />}
                  Github
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
