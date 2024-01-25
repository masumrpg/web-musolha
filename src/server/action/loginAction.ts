"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

interface FormData {
  username: string
  password: string
}

export async function loginAction(formData:FormData) {
  try {
    await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirectTo: "/",
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch(error.type) {
        case "CredentialsSignin":
          return {error: "Username atau password salah"};
        default:
          return {error: "Error tidak diketahui"};
      }
    }
    throw error;
  }
};