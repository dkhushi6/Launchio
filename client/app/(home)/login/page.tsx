"use client";
import { Button } from "../../../components/ui/button";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";

const page = () => {
  useEffect(() => {
    console.log("ENV CHECK:", {
      GITHUB_ID: process.env.GITHUB_ID,
      GITHUB_SECRET: process.env.GITHUB_SECRET,
      AUTH_SECRET: process.env.AUTH_SECRET,
    });
  });
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
                onClick={() => {
                  signIn("github", { callbackUrl: "/" });
                }}
              >
                <div className="flex gap-3 items-center">Github</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
