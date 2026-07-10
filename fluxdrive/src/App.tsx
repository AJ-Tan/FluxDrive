import { createHashRouter, RouterProvider } from "react-router";
import { routes } from "./routes/routes";
import "./App.css";

function App() {
  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
