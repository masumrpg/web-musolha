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

    return Response.json(rest,{status: 200});
  } catch {
    return NextResponse.json(
      { message: "Kesalahan internal server" },
      { status: 500 },
    );
  }
}

export async function PATCH(req:Request,{params}:{params:{username: string}}){
  try {
    const body = await req.json();
    // console.log(body);

    if (body) {
      return NextResponse.json({
        message: "User tidak ada"
      });
    }

    const user = await db.user.update({
      where: {
        username: params.username
      },
      data: body
    });

    // console.log(user);


    if (!user) return NextResponse.json({
      message: "User tidak ada"
    });

    return NextResponse.json({message: "Sukkses update data"},{status: 200});
  } catch  {
    return NextResponse.json(
      { message: "Kesalahan internal server" },
      { status: 500 },
    );
  }
}