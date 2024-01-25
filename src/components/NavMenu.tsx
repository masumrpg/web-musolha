import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { auth } from "@/lib/auth";
import { buttonVariants } from "./ui/button";
import NavComponents from "./NavComponents";

export async function NavMenu() {
  const session = await auth();
  return (
    <div className="container flex h-14 max-w-screen-2xl items-center">
      <div className="mr-4 hidden md:flex gap-3">
        <Link href="/" legacyBehavior passHref>
          Beranda
        </Link>
        <Link href="/" legacyBehavior passHref>
          Tabel
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <ModeToggle />

        {session?.user ? (
          <NavComponents />
        ) : (
          <Link className={buttonVariants()} href="/signin">
            Signin
          </Link>
        )}
      </div>
    </div>
  );
}
