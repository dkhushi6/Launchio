"use client";
import { HomePath, LoginPath, MyReposPath } from "@/lib/path";
import Link from "next/link";
import Logo from "../logo";
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
    <div className="fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60 w-full">
      <div className=" mx-auto flex items-center justify-between py-3 px-6">
        <Link href={HomePath()} className="flex items-center gap-2">
          <Logo size={24} />
          <span className="text-[13px] font-medium text-muted-foreground uppercase tracking-widest ">
            Launchio
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          {!session?.user ? (
            <Link
              href={LoginPath()}
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              Sign in
            </Link>
          ) : (
            <>
              <Link
                href={MyReposPath()}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                My Repos
              </Link>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="cursor-pointer">
                    <Image
                      alt="user-image"
                      src={session.user?.image || "/default.jpg"}
                      width={32}
                      height={32}
                      className="rounded-full border"
                    />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-48 p-4 flex flex-col items-center gap-3 text-center">
                  <Image
                    alt="user-image"
                    src={session.user?.image || "/default.jpg"}
                    width={44}
                    height={44}
                    className="rounded-full border"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {session.user?.email}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Button>
                </HoverCardContent>
              </HoverCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
