import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import * as z from "zod";

// const formSchema = z.object({
//   username: z.string().min(5),
//   password: z.string().min(1).min(8),
//   namaLengkap: z.string().min(3),
//   tanggalLahir: z.date(),
//   desa: z.string().min(4),
//   rtRw: z.string().min(4).max(10),
//   noHp: z.string().min(10).max(14),
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, name, dob, village, rtRw, phone } =
      body;
    // username existing
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "Username sudah ada" },
        { status: 409 },
      );
    }

    const hashPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        password: hashPassword,
        name,
        dob,
        village,
        rtRw,
        phone,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: `Selamat ${rest.name} kamu sudah terdaftar`,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Kesalahan internal server" },
      { status: 500 },
    );
  }
}
