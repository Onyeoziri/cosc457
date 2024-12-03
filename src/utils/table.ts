import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { useAtom } from "jotai";

interface Businesses {
  id: number;
  name: string;
  address: string;
  phone_number: number;
}

export async function getBusinessesTable() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Businesses").select("*");
      console.log(data);
      if (error) {
        console.log("Error steamed for gettingTable: ", error);
        throw error;
      }
      return { data };
    },
  });
}
