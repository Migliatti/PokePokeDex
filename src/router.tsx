import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PokemonProvider } from "common/context/pokemons";

import SimplePage from "./pages/SimplePage";
import PokemonPage from "./pages/PokemonPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function Routers() {
  return (
    <BrowserRouter>
      <PokemonProvider>
        <Header />
        <Routes>
          {[
            <Route key="simple" path="/" element={<SimplePage />}>
              <Route path="page/:page?" element={<SimplePage />} />
            </Route>,
            <Route
              key="pokemon"
              path="/pokemon/:idPage"
              element={<PokemonPage />}
            />,
            <Route key="notFound" path="*" element={<NotFoundPage />} />,
          ]}
        </Routes>
        <Footer />
      </PokemonProvider>
    </BrowserRouter>
  );
}

export default Routers;
