import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Loader2 } from "lucide-react";
const Navbar = () => {
  const { data, status } = useSession();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              href="/docs"
            >
              Documentation
            </a>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end  space-x-2 sm:space-x-4">
          <div className="">
            {data ? (
              <div>
                <Popover>
                  <PopoverTrigger className="flex items-center ">
                    <Avatar>
                      <AvatarImage
                        src={data?.user.image || ""}
                        alt="profile image"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Label className="ml-2">{data.user.name}</Label>
                  </PopoverTrigger>
                  <PopoverContent className="flex justify-center">
                    <Button onClick={() => void signOut()}>Sign Out</Button>
                  </PopoverContent>
                </Popover>
              </div>
            ) : status === "loading" ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </div>
            ) : (
              <Button onClick={() => void signIn()}>Sign in</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
const Footer = () => {
  return <div className="min-h-[22rem] bg-zinc-500">Footer</div>;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
