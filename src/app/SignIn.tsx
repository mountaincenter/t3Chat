"use client";

import { useSession, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

const SignIn = () => {
  const { data: session } = useSession();

  if (session) {
    return null;
  }

  return <Button onClick={() => signIn()}>Sign in</Button>;
};

export default SignIn;
