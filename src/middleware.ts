import { auth } from "@/lib/auth";

export default auth((req) => {
  const isSignIn = !!req.auth;
  const { nextUrl } = req;

  if (nextUrl.pathname === "/signin" || "/" || "/signup") return null;

  if (!isSignIn && nextUrl.pathname !== "/signin") return Response.redirect(new URL("/signin", nextUrl));
});


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
