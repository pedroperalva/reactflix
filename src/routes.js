import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Movie from "./views/Movie";
import Favorites from "./views/Favorites";

import Header from "./components/Header";

import Error from "./views/Error";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
