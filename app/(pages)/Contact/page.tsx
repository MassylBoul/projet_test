"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";

async function getRestaurant() {
  // let resto;
  axios
    .get("https://projettest-datatable.vercel.app/api/Restaurant?id=1")
    .then((response) => {
      console.log(response.data);
    });
}
const Contact = () => {
  return (
    <div className=" items-center flex h-full p-9 space-x-10">
      <div className="border-2 border-gray-300 p-10 h-full bg-gray-200 rounded-sm">
        Contact
        <Button
          className="p-5 m-5 py-6 bg-indigo-800 text-lg rounded-xl"
          onClick={getRestaurant}
        >
          Get Restaurants
        </Button>
      </div>
      <div className="border p-10 m-7 h-full grow rounded-sm flex items-baseline justify-center">
        Contact
        <Button
          className="p-5 m-5 py-6 bg-indigo-800 text-lg rounded-xl"
          onClick={getRestaurant}
        >
          Get Restaurants
        </Button>
      </div>
    </div>
  );
};

export default Contact;
