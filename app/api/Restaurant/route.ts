import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  try {
    if (id) {
      const restaurant = await prisma.restaurant.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (restaurant) {
        return NextResponse.json(restaurant, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Restaurant not found" },
          { status: 404 }
        );
      }
    } else {
      const restaurants = await prisma.restaurant.findMany();
      return NextResponse.json(restaurants, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Restaurant not found", error: err },
      { status: 404 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const { email, nom, telephone } = data;
    // Validation des données
    if (!email || !nom || !telephone) {
      return NextResponse.json({
        message: "Tous les champs sont obligatoires",
        status: 400,
      });
    }

    // Vérification de l'existence de l'email
    const emailExists = await prisma.restaurant.count({ where: { email } });
    if (emailExists > 0) {
      return NextResponse.json({
        message: "Adresse courriel déjà existante",
        status: 400,
      });
    }

    // Vérification de l'existence du téléphone
    const phoneExists = await prisma.restaurant.count({ where: { telephone } });
    if (phoneExists > 0) {
      return NextResponse.json({
        message: "Numéro de téléphone déjà existant",
        status: 400,
      });
    }

    await prisma.restaurant.create({ data });
    return NextResponse.json({ message: "Ajout réussi", status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Erreur de db", error: err },
      { status: 403 }
    );
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method } = req;

//   if (method === "GET") {
//     console.log(0);
//     if (req.query.id) {
//       console.log(1);
//       const restaurant = await getRestaurant(Number(req.query.id));
//       if (restaurant) {
//         console.log(1.1);
//         return res.status(200).json(restaurant);
//       } else {
//         console.log(1.2);
//         return res.status(404).json({ error: "User not found" });
//       }
//     } else {
//       console.log(2);
//       const users = await getRestaurants();
//       return res.status(200).json({ users });
//     }
//   } else {
//     console.log("raté");
//   }

//   //   if (method === "POST") {
//   //     const { name, email } = req.body;

//   //     if (!name || !email) {
//   //       return res.status(400).json({ error: "Name and email are required" });
//   //     }

//   //     const newUser = await createUser({ name, email });
//   //     return res.status(201).json(newUser);
//   //   }

//   res.status(405).json({ error: `Method ${method} Not Allowed` });
// }
