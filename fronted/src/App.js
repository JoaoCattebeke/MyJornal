import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormCadastro from "./FormCadastro";
import FormLogin from "./FormLogin";
import PrimeiraPagina from "./PrimeiraPagina";
import Logado from "./Logado";
import FormMateria from "./CriarMateria";
import VerMateria from "./VerMateria";
import PedidosRecebidos from "./PedidosRecebidos";
import AdicionarAmigo from "./AdicionarAmigo";
import SolicitacoesAmizade from "./SolicitacoesAmizade";
import Amigos from "./Amigos";
import Conta from "./Conta";

export default function Formularios(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrimeiraPagina />} />
        <Route path="/formCadastro" element={<FormCadastro />} />
        <Route path="/formLogin" element={<FormLogin />} />
        
        <Route path="/logado" element={<Logado />} />
        <Route path="/formMateria" element={<FormMateria />} />
        <Route path="/verMateria" element={<VerMateria />} />
        <Route path="/pedidosRecebidos" element={<PedidosRecebidos />} />
        <Route path="/adiconarAmigo" element={<AdicionarAmigo />} />
        <Route path="/solicitacoesAmizade" element={ <SolicitacoesAmizade />} />
        <Route path="/amigos" element={<Amigos />} />
        <Route path="/conta" element={<Conta />} />
      </Routes>
    </Router>
  )
}
