import SignUpForm from "@/components/form/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function SignUp() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Daftar</CardTitle>
        <CardDescription>Silahkan lengkapi semua data</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
