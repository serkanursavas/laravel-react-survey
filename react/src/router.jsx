import { createBrowserRouter } from "react-router-dom";

import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Surveys from "./views/Surveys";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/surveys", element: <Surveys /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
