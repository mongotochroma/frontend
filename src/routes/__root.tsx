import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div style={{ padding: 20, fontFamily: "system-ui" }}>
        <h1>My App</h1>
        <nav>
          <Link to="/" style={{ marginRight: 10 }}>
            Home
          </Link>
        </nav>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
