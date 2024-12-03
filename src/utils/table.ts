import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { useAtom } from "jotai";

interface BusinessesTable {}

export async function getBusinessesTable() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Businesses") // Replace with your actual table name
        .select("*");

      if (error) {
        console.log("Error fetching Data");
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { data, isLoading };
}
