"use client";
import { useSession } from "next-auth/react";

export default function User() {
  const session = useSession();

  return <div>Hallo {session.data?.user.name} from client component</div>;
}
