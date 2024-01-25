"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function NavComponents() {
  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <Button onClick={handleSignOut} variant="destructive">
      Signout
    </Button>
  );
}
