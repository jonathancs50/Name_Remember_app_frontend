"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <button className="bg-green-400" onClick={() => signOut()}>
        Sign Out
      </button>
    );
  }

  return <button onClick={() => signIn("cognito")}>Sign In</button>;
}
