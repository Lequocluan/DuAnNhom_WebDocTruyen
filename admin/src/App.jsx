import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Home from "./components/home/Home"
import NotFound from "./components/not_found/NotFound"
import Category from "./components/category/Category"
import Author from './components/author/Author'
import Chapter from './components/chapter/Chapter'
import Login from "./components/auth/Login"
import ProtectedRoute from "./components/auth/ProtectedRoute"
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />

        {/* Route được bảo vệ */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route path="category" element={<Category />}/>
          
          <Route path="author" element={<Author />} />
          <Route path="/chapters" element={<Chapter />} />

          <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
