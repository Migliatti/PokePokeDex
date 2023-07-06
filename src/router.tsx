import { BrowserRouter, Route, Routes } from "react-router-dom";
import SimplePAge from "./pages/SimplePage";
import Header from "./Components/Header";
import PokemonPage from "./pages/PokemonPage";
import Footer from "./Components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function Routers() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/page?/:page?" element={<SimplePAge />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routers;
