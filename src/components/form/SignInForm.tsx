"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { loginAction } from "@/server/action/loginAction";

const FormSchema = z.object({
  username: z
    .string()
    .min(1, "Username dibutuhkan")
    .regex(RegExp("^[a-z0-9_]+$"), "Hanya huruf kecil dan angka")
    .min(5, "Minimal 5 karakter"),
  password: z
    .string()
    .min(1, "Password dibutuhkan")
    .regex(RegExp("^[^ ]+$"), "Tidak boleh ada spasi")
    .min(8, "Password harus memiliki 8 karakter"),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const error = await loginAction(values);
    if (error) {
      toast.error(error.error);
    } else {
      toast.success("Berhasil login");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Masukan Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukan Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Jika belum punya akun, langsung&nbsp;
        <Link className="text-blue-500 hover:underline" href="/signup">
          Daftar
        </Link>
      </p>
    </Form>
  );
}
