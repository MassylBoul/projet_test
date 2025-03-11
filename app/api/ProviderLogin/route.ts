import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(req: NextRequest) {
  console.log("debut");
  try {
    const data = await req.json();
    const { email, name } = data.user;
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          role: "USER",
        },
      });
      return NextResponse.json(user, { status: 200 });
    }
  } catch {
    return NextResponse.json({ message: "login error" }, { status: 404 });
  }
}
