import Button from "react-bootstrap/Button";
import "./style/logado.css";

export default function MenuPrincipal() {
  return (
    <header className="logado-cabecalho">
      <h1>MYJORNAL</h1>
      <nav className="logado-menu" aria-label="Menu principal">
        <Button className="logado-botao logado-botao-menu" href="/logado">Home</Button>
        <Button className="logado-botao logado-botao-menu" href="/formMateria">Criar Materia</Button>
        <Button className="logado-botao logado-botao-menu" href="/meusPosts">Meus Posts</Button>
        <Button className="logado-botao logado-botao-menu" href="/adicionarAmigo">Adicionar Amigo</Button>
        <Button className="logado-botao logado-botao-menu" href="/pedidosRecebidos">Pedidos Recebidos</Button>
        <Button className="logado-botao logado-botao-menu" href="/solicitacoesAmizade">Solicitacoes de Amizade</Button>
        <Button className="logado-botao logado-botao-menu" href="/amigos">Amigos</Button>
        <Button className="logado-botao logado-botao-conta" href="/conta">Conta</Button>
      </nav>
    </header>
  );
}
