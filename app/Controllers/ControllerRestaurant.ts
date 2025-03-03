import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

interface Restaurant {
  email: string;
  nom: string;
  telephone: string;
}

export async function getRestaurant(id: number) {
  return await prisma.restaurant.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getRestaurants() {
  return await prisma.restaurant.findMany();
}

export async function postRestaurant(data: Restaurant) {
  try {
    const { email, nom, telephone } = data;
    // Validation des données
    if (!email || !nom || !telephone) {
      return { message: "Tous les champs sont obligatoires", status: 400 };
    }

    // Vérification de l'existence de l'email
    const emailExists = await prisma.restaurant.count({ where: { email } });
    if (emailExists > 0) {
      return { message: "Adresse courriel déjà existante", status: 400 };
    }

    // Vérification de l'existence du téléphone
    const phoneExists = await prisma.restaurant.count({ where: { telephone } });
    if (phoneExists > 0) {
      return { message: "Numéro de téléphone déjà existant", status: 400 };
    }

    // Création du restaurant
    await prisma.restaurant.create({ data });

    return { message: "Ajout réussi", status: 201 }; // 201 pour "Created"
  } catch (error) {
    console.error("Erreur lors de l'ajout du restaurant:", error);
    return { message: "Échec de l'ajout du restaurant", status: 500 };
  }
}
