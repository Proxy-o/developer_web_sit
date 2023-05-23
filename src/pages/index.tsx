import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Button } from "components/ui/button";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Home: NextPage = () => {
  const { data, status } = useSession();
  const handLogin = async () => {
    await signIn();
  };
  return (
    <>
      <Button onClick={() => void handLogin()}>Login</Button>
      <h1>{data?.user.name}</h1>
      <h1>{data?.user.email}</h1>
      <Avatar className="mr-3 ">
        <AvatarImage src={data?.user.image || "null"} alt="" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </>
  );
};

export default Home;
