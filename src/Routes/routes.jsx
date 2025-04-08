import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import Reports from "../Pages/Dashboard/Reports/Reports";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import ManageDiscounts from "../Pages/Dashboard/Discounts/Discounts";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import Inventory from "../Pages/Dashboard/Inventory/Inventory";
import ManageProducts from "../Pages/Dashboard/ManageProducts/ManageProducts";
import ManageContent from "../Pages/Dashboard/ManageContent/ManageContent";
import ManageOrders from "../Pages/Dashboard/Orders/Orders";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Settings from "../Pages/Dashboard/Settings/Settings";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },

      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "manage-discounts",
            element: <ManageDiscounts />,
          },
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
          {
            path: "inventory",
            element: <Inventory />,
          },
          {
            path: "manage-products",
            element: <ManageProducts />,
          },
          {
            path: "manage-orders",
            element: <ManageOrders />,
          },
          {
            path: "manage-content",
            element: <ManageContent />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
