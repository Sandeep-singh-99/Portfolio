import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../Page/Home";
import MainPanel from "../Page/Admin/MainPanel";
import AdminLogin from "../Page/Admin/AdminLogin";
import Dashboard from "../Page/Admin/Dashboard";
import AdminAbout from "../Page/Admin/AdminAbout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },

  {
    path: "admin",
    element: <MainPanel />,
    children: [
      {
        index: true, 
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <AdminAbout/>
      }
    ],
  },
]);

export default routes;
