import { BrowserRouter, Route, Routes } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import Header from "./Components/Header";
import PokemonPage from "./pages/PokemonPage";

function Routers() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/2" element={<PokemonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
