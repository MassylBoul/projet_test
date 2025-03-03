"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

type FormAddRestaurantProps = {
  onAdd: () => void;
};

export default function FormAddRestaurant({ onAdd }: FormAddRestaurantProps) {
  const [errorStyle, setErrorStyle] = useState("hidden");
  const [errorMessage, setErrorMessage] = useState("");

  async function addRestaurant(data: {
    nom: string;
    email: string;
    telephone: string;
  }) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Restaurant",
        data
      );
      if (response.data.status == 200) {
        setErrorMessage("Envoie Réussi");
        setErrorStyle("text-green-400");
        onAdd();
      } else {
        setErrorMessage(response.data.message);
        setErrorStyle("text-red-400");
      }
    } catch {
      setErrorMessage("une erreur est survenu");
      setErrorStyle("text-red-400");
    }
  }
  const form = useForm({
    defaultValues: {
      email: "",
      nom: "",
      telephone: "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addRestaurant)} className="space-y-8">
          <p className={errorStyle}>{errorMessage}</p>
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" required {...field} />
                </FormControl>
                <FormDescription>
                  Enter the name of the restaurant you want to create.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the email of the restaurant you want to create.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                    required
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the phone number of the restaurant you want to create.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            className="p-5 py-6 bg-indigo-800 text-base rounded-xl"
            type="submit"
          >
            Add Restaurant
          </Button>
        </form>
      </Form>
    </div>
  );
}
