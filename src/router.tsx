import { BrowserRouter, Route, Routes } from "react-router-dom";
import SimplePAge from "./pages/SimplePage";
import Header from "./Components/Header";
import PokemonPage from "./pages/PokemonPage";

function Routers() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SimplePAge />} />
        <Route path="/2" element={<PokemonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
