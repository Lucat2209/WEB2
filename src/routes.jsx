import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
  // Adicionando o Outlet
  
import Categoria from './pages/Categoria/crudCategoria';
import Header from './pages/Header/header';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Material from "./pages/Material/crudMaterial";
import Usuario from "./pages/Usuario/usuario";
import Rodape from "./pages/Rodape/rodape";
import Agendamento from "./pages/Agendamento/agendamento";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/crudCategoria" element={<Categoria />} />
                    <Route path="/crudMaterial" element={<Material />} />
                    <Route path="/usuario" element={<Usuario />} />
                    <Route path="/rodape" element={<Rodape />} />
                    <Route path="/agendamento" element={<Agendamento />} />
                    <Route path="/agendamento" element={<Agendamento />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet /> {/* Adicionando o Outlet aqui */}
            </main>
        </>
    );
}

export default RoutesApp;
