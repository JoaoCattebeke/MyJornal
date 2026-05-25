import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormCadastro from "./FormCadastro";
import FormLogin from "./FormLogin";
import PrimeiraPagina from "./PrimeiraPagina";
import Logado from "./Logado";
import FormMateria from "./CriarMateria";
import AltCadastro from "./PaginaAltCadastro";
import VerMateria from "./VerMateria";
import AdicionarAmigo from "./AdicionarAmigo"

export default function Formularios(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrimeiraPagina />} />
        <Route path="/formCadastro" element={<FormCadastro />} />
        <Route path="/formLogin" element={<FormLogin />} />
        //Pagina logado
        <Route path="/logado" element={<Logado />} />
        <Route path="/formMateria" element={<FormMateria />} />
        <Route path="/altCadastro" element={<AltCadastro />} />
        <Route path="/verMateria" element={<VerMateria />} />
        <Route path="/adicionarAmigo" element={<AdicionarAmigo />} />
      </Routes>
    </Router>
  )
}
