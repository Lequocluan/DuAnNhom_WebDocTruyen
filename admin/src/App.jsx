import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./components/home/Home";
import NotFound from "./components/not_found/NotFound";
import Category from "./components/category/Category";
import AddCategory from "./components/category/AddCategory";
import EditCategory from "./components/category/EditCategory";

import Story from "./components/story/Story";
import EditStory from "./components/story/EditStory";
import AddStory from "./components/story/AddStory";
import Author from "./components/author/Author";
import Chapter from "./components/chapter/Chapter";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AddAuthor from "./components/author/Add";
import { ToastContainer } from "react-toastify";
import EditAuthor from "./components/author/Edit";
import Advertise from "./components/advertise/Advertise";
import AddAds from "./components/advertise/AddAds";
import EditAds from "./components/advertise/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Route được bảo vệ */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />

            <Route path="category" element={<Category />} />
            <Route path="author" element={<Author />} />
            
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
            
            <Route path="story" element={<Story />} />
            <Route path="story/add" element={<AddStory />} /> 
            <Route path="story/edit/:id" element={<EditStory />} />

            {/* Part author */}
            <Route path="author">
              <Route element={<Author />} />
              <Route path="add" element={<AddAuthor />} />
              <Route path="edit/:id" element={<EditAuthor />} />
            </Route>

            {/* Part advertise */}
            <Route path="ads" element={<Advertise />} />
            <Route path="ads/add" element={<AddAds />} />
            <Route path="ads/edit/:id" element={<EditAds/>} />

            <Route path="/chapters" element={<Chapter />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
