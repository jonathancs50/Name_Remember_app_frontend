"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
export default function LoginButton({ text }) {
  const handleLogin = async () => {
    await signIn("cognito", { callbackUrl: "/dashboard" });
  };

  return (
    <Button onClick={handleLogin} className="">
      {text}
    </Button>
  );
}
