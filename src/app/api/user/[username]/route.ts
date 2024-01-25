import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{username: string}}) {
  try {
    const user = await db.user.findUnique({
      where: {username: params.username}
    });

    if (!user) {
      return NextResponse.json({
        message: "User tidak ada"
      }, {status: 404});
    }

    const {password,...rest} = user;

    return Response.json(rest);
  } catch (error) {
    return NextResponse.json(
      { message: "Kesalahan internal server" },
      { status: 500 },
    );
  }
}