import User from "@/components/User";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold">
          {session?.user
            ? `Hallo ${session.user.name} from server component`
            : "Hallo user"}
          <User />
        </h1>
      </div>
    </main>
  );
}
