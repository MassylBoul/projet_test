"use client";

import { useForm } from "react-hook-form";

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
import axios from "axios";
import { useState /*, useMemo */ } from "react";
// import { useTable } from "react-table";
import FormAddRestaurant from "@/app/components/FormAddRestaurant/FormAddRestaurant";
import {
  DataTableDemo,
  columns,
} from "@/app/components/DataTableEx/DataTableEx";
import { Restaurant } from "@/app/Types/Type";

export default function AfficherRestaurant() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(
    [] as Restaurant[]
  );
  const [errorStyle, setErrorStyle] = useState("hidden");

  async function getRestaurants() {
    try {
      const response = await axios.get("http://localhost:3000/api/Restaurant");

      if (response.status == 200) {
        setRestaurants(response.data);
        setErrorStyle("hidden");
      }
    } catch {
      console.log("Restaurants not found");
    }
  }
  async function getRestaurant(data: { id: number }) {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/Restaurant?id=" + data.id
      );
      if (response.status == 200) {
        setRestaurants([response.data]);
        setErrorStyle("hidden");
        console.log(response.data);
      }
    } catch {
      setErrorStyle("text-red-300");
    }
  }

  const form = useForm({
    defaultValues: {
      id: 0,
    },
  });

  return (
    <div className=" items-center flex h-full p-9 space-x-10">
      <div className="h-full flex flex-col gap-10">
        <div className="border-2 border-gray-300 p-10 bg-gray-200 rounded-sm flex justify-center">
          <Button
            className="p-8 m-5 bg-indigo-800 text-xl rounded-xl grow"
            onClick={getRestaurants}
          >
            Get Restaurants
          </Button>
        </div>

        <div className="border-2 border-gray-300 p-10 bg-gray-200 rounded-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(getRestaurant)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant ID</FormLabel>

                    <div className="flex items-center gap-3">
                      <FormControl>
                        <Input type="number" placeholder="ID" {...field} />
                      </FormControl>
                      <Button
                        className="p-5 py-6 bg-indigo-800 text-base rounded-xl"
                        type="submit"
                      >
                        Get Restaurant
                      </Button>
                    </div>
                    <FormDescription>
                      Enter the ID of the restaurant you want to get.
                    </FormDescription>
                    <p className={errorStyle}>
                      {" "}
                      Entrez un ID de restaurant existant{" "}
                    </p>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="border-2 border-gray-300 p-10 bg-gray-200 rounded-sm">
          <FormAddRestaurant onAdd={getRestaurants} />
        </div>
      </div>
      <div className="border p-10 m-7 h-full grow rounded-sm flex items-baseline justify-center">
        <DataTableDemo columns={columns} data={restaurants} />
      </div>
    </div>
  );
}
