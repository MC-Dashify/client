import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./components/common/globalstyles";
import "./styles/font-settings.css";

import Overview from "./routes/Overview";
import DashboardLayout from "./routes/DashboardLayout";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ index: true, element: <Overview /> }],
  },
  {
    path: "/",
    element: <Root />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
