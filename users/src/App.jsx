import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Category from "./ui/Category";
import Search from "./ui/Search";
import Chapter from "./ui/Chapter";
import Details from "./ui/Details";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import DetailComic from "./ui/DetailComic";
import ForgotPassword from "./components/login/ForgotPassword";

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
        path: "/search",
        element: <Search />,
      },

      {
        path: "/:slugStory/:slugChapter",
        element: <Chapter />,
      },
      {
        path: "truyen-chu/:slugStory",
        element: <Details />,
      },
      {
        path: "/truyen-tranh/:slugComic",
        element: <DetailComic />,
      },
    ],
  },
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/register", element: <Register />, errorElement: <Error /> },
  { path: "/forgot", element: <ForgotPassword />, errorElement: <Error /> },
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
