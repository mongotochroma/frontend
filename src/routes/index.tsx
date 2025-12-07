import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="bg-green-200">Hello from TanStack Router!</div>
  ),
});
