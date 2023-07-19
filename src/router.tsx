import { BrowserRouter, Route, Routes } from "react-router-dom";
import SimplePage from "./pages/SimplePage";
import Header from "./Components/Header";
import PokemonPage from "./pages/PokemonPage";
import Footer from "./Components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function Routers() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SimplePage />}>
          <Route path="page/:page?" element={<SimplePage />} />
        </Route>
        <Route path="/pokemon/:idPage" element={<PokemonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routers;
