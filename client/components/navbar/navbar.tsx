"use client";
import { HomePath, LoginPath } from "@/app/path";
import Link from "next/link";
import { Triangle } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import ThemeSwitcher from "../theme/theme-switcher";

const Navbar = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      console.log("user Logged in");
    }
  }, [session]);
  return (
    <div className="supports-backdrop-blur:bg-background/60 max-w-8xl mx-auto fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
      <div>
        <Link
          href={HomePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <div className="flex gap-1 items-center ">
            <Triangle size={18} fill="black" />
            <h1 className="font-bold tracking-tight text-lg">Vercel-Clone</h1>
          </div>
        </Link>
      </div>
      <div className="flex gap-2">
        <Link
          href={"/my-repos"}
          className={buttonVariants({ variant: "default" })}
        >
          MyRepos
        </Link>
        <ThemeSwitcher />{" "}
        {!session?.user ? (
          <Link
            href={LoginPath()}
            className={buttonVariants({ variant: "default" })}
          >
            <div className="flex gap-1 items-center ">
              <h1 className="font-semibold tracking-tight text-lg">Login</h1>
            </div>
          </Link>
        ) : (
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="flex items-center gap-2 cursor-pointer  ">
                  <Image
                    alt="user-image"
                    src={session.user?.image || "/default.jpg"}
                    width={36}
                    height={36}
                    className="rounded-full border-2"
                  />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-48 p-4 flex flex-col items-center gap-3 text-center">
                <Image
                  alt="user-image"
                  src={session.user?.image || "/default.jpg"}
                  width={48}
                  height={48}
                  className="rounded-full border"
                />
                <p className="text-sm font-semibold">{session.user?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {session.user?.email}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signOut()}
                >
                  Log Out
                </Button>
              </HoverCardContent>
            </HoverCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
