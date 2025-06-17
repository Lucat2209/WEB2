import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import Categoria from "./pages/Categoria/categoria";
import Header from "./pages/Header/header";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Material from "./pages/Material/crudMaterial";
import Usuario from "./pages/Usuario/usuario";
import Rodape from "./pages/Rodape/rodape";
import Agendamento from "./pages/Agendamento/agendamento";
import ForgotPassword from "./pages/Senha/senha";

// Layout separado para ser usado dentro do BrowserRouter
function LayoutComHeader() {
  const location = useLocation();

  const rotasSemHeader = ["/usuario", "/login", "/cadastro"];
  const exibirHeader = !rotasSemHeader.includes(location.pathname);

  return (
    <>
      {exibirHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
}

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona para login ao acessar "/" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login fora do layout */}
        <Route path="/login" element={<Login />} />

        {/* Layout padrão com Header condicional */}
        <Route element={<LayoutComHeader />}>
          <Route path="/home" element={<Home />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/crudMaterial" element={<Material />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/rodape" element={<Rodape />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
