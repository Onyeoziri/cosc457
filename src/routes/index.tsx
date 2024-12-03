import SideBar from "@/components/navigation/SideBar";
import { getBusinessesTable } from "@/utils/table";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [data, setData] = useState<any[]>([]); // State to hold businesses data

  return (
    <div className="p-2">
      <h2>Using this to test database contection & tables</h2>

      <div>
        <h3>Businesses List:</h3>
        <ul>
          {data.map((business) => (
            <li key={business.id}>{business.name}</li> // Adjust based on your data structure
          ))}
        </ul>
      </div>
      <hr />
      <SideBar />
    </div>
  );
}
