import { createHashRouter, RouterProvider } from "react-router";
import { routes } from "./routes/routes";
import "./App.css";

// App root component.
// The app uses a hash router, which is useful for static deployments and route handling without a backend rewrite.
function App() {
  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
