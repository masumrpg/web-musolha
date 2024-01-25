"use client";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface ErrorBackendResponse {
  message: string;
}

const formSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username dibutuhkan")
      .regex(
        RegExp("^[a-z0-9_]+$"),
        "Tidak mengandung spasi,karakter unik dan huruf kapital",
      )
      .min(5, "Minimal 5 karakter"),
    password: z
      .string()
      .min(1, "Password dibutuhkan")
      .regex(RegExp("^[^ ]+$"), "Tidak boleh ada spasi")
      .min(8, "Password harus memiliki 8 karakter"),
    confirmPassword: z
      .string()
      .min(1, "Konfirm password dibutuhkan")
      .regex(RegExp("^[^ ]+$"), "Tidak boleh ada spasi")
      .min(8, "Konfirm password harus memiliki 8 karakter"),
    name: z
      .string()
      .regex(RegExp("^[a-zA-Z\\s]+$"), "Hanya huruf")
      .min(3, "Nama minimal 3 karakter"),
    dob: z.date(),
    village: z
      .string()
      .regex(RegExp("^[a-zA-Z\\s]+$"), "Hanya huruf")
      .min(4, "Nama desa minimal 4 karakter"),
    rtRw: z
      .string()
      .regex(RegExp("^[0-9/]+$"), "Hanya angka dan spasi")
      .min(4, "RT/RW minimal 4 karakter")
      .max(10, "Maksimal 10 karakter"),
    phone: z
      .string()
      .regex(RegExp("^[0-9]+$"), "No HP harus angka")
      .min(10, "Setidaknya 10 karakter")
      .max(14, "Maksimal 14 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama",
  });

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      dob: new Date(),
      village: "",
      rtRw: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      username: values.username,
      password: values.password,
      name: values.name,
      dob: values.dob,
      village: values.village,
      rtRw: values.rtRw,
      phone: values.phone,
    };

    try {
      const res = await axios.post("/api/user/signup", formData);

      if (res.status === 201) {
        toast.success(res.data.message);
        router.push("/signin");
      }
    } catch (error: unknown | any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorBackendResponse>;
        toast.error(axiosError.response?.data?.message);
      } else {
        toast.error("Internal error");
      }
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
                  <Input placeholder="Masukan nama panggilan anda" {...field} />
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
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ulangi Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukan ulang password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Masukan namamu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* dob */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Lahir</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Tanggal lahirmu untuk menghitung umur.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="village"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desa</FormLabel>
                <FormControl>
                  <Input placeholder="Masukan nama desamu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rtRw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RT/RW</FormLabel>
                <FormControl>
                  <Input placeholder="Masukan RT/RW" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No HP</FormLabel>
                <FormControl>
                  <Input placeholder="Masukan No HP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign up
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Jika kamu sudah mempunyai akun, kesini&nbsp;
        <Link className="text-blue-500 hover:underline" href="/signin">
          Sign in
        </Link>
      </p>
    </Form>
  );
}
