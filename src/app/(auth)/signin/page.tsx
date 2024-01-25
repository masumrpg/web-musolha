import SignInForm from "@/components/form/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Masuk</CardTitle>
        <CardDescription>Silahkan masuk ke akun anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}
