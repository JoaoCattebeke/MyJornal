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
import MeusPosts from "./MeusPosts";
import ProtectedRoute from "./ProtectedRoute";

export default function Formularios() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrimeiraPagina />} />
        <Route path="/formCadastro" element={<FormCadastro />} />
        <Route path="/formLogin" element={<FormLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/logado" element={<Logado />} />
          <Route path="/formMateria" element={<FormMateria />} />
          <Route path="/verMateria" element={<VerMateria />} />
          <Route path="/pedidosRecebidos" element={<PedidosRecebidos />} />
          <Route path="/adicionarAmigo" element={<AdicionarAmigo />} />
          <Route path="/adiconarAmigo" element={<AdicionarAmigo />} />
          <Route path="/solicitacoesAmizade" element={<SolicitacoesAmizade />} />
          <Route path="/amigos" element={<Amigos />} />
          <Route path="/conta" element={<Conta />} />
          <Route path="/meusPosts" element={<MeusPosts />} />
        </Route>
      </Routes>
    </Router>
  );
}
