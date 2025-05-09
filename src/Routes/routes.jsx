import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import ManageDiscounts from "../Pages/Dashboard/Discounts/Discounts";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageProducts from "../Pages/Dashboard/ManageProducts/ManageProducts";
import ManageContent from "../Pages/Dashboard/ManageContent/ManageContent";
import ManageOrders from "../Pages/Dashboard/Orders/Orders";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Settings from "../Pages/Dashboard/Settings/Settings";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Checkout from "../Pages/Checkout/Checkout";
import Cart from "../Pages/Cart/Cart";
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
        path: "/shop/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
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
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
