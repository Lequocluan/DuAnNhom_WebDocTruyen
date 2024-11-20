import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./components/home/Home";
import NotFound from "./components/not_found/NotFound";
import Category from "./components/category/Category";
import AddCategory from "./components/category/AddCategory";
import EditCategory from "./components/category/EditCategory";
import Author from "./components/author/Author";
import Chapter from "./components/chapter/Chapter";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AddAuthor from "./components/author/Add";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    
    <BrowserRouter>
    <ToastContainer/>
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

            {/* Part author */}
            <Route path="author">
              <Route element={<Author />} />
              <Route path="add" element={<AddAuthor />} />
            </Route>

            <Route path="/chapters" element={<Chapter />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
