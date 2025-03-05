import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      if (user.password == data.password) {
        return NextResponse.json(user, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Mot de passe incorrect" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Utilisateur inexistant" },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json({ message: "login error" }, { status: 404 });
  }
}
