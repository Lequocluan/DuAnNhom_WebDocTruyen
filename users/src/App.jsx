import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Category from "./ui/Category";
import Search from "./ui/Search";
import Chapper from "./ui/Chapper";
import Details from "./ui/Details";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        // Component Home sẽ được hiển thị khi người dùng truy cập vào "/"
        path: "/category/:slugCategory",
        element: <Category />,
      },

      {
        // Component Home sẽ được hiển thị khi người dùng truy cập vào "/"
        path: "/search",
        element: <Search />,
      },

      {
        // Component Home sẽ được hiển thị khi người dùng truy cập vào "/"
        path: "/chapper",
        element: <Chapper />,
      },
      {
        // Component Home sẽ được hiển thị khi người dùng truy cập vào "/"
        path: "/:slugCategory",
        element: <Details />,
      },
    ],
  },
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/register", element: <Register />, errorElement: <Error /> },
]);

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
