import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-2">
      <h3>
        This is an app designed to depict the full scope of a database from an adimistration
        view
      </h3>
    </div>
  );
}
