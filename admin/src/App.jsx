import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Home from "./components/home/Home"
import About from "./components/about/About"
import Contact from "./components/contact/Contact"
import NotFound from "./components/not_found/NotFound"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
