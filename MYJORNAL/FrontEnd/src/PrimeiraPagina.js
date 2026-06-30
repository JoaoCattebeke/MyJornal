import Button from "react-bootstrap/Button";
import "./style/primeiraPagina.css";

export default function PrimeiraPagina() {
  return (
    <>
      <header className="primeira-cabecalho">
        <h1>MYJORNAL</h1>

        <nav className="primeira-menu" aria-label="Acesso">
          <Button className="primeira-botao primeira-botao-cadastro" href="/formCadastro">Formulário Cadastro</Button>
          <Button className="primeira-botao primeira-botao-login" href="/formLogin">Formulário Login</Button>
        </nav>
      </header>
      <main className="primeira-pagina-sem-login">
        <section className="primeira-imagens" aria-label="Destaques">
          <div className="primeira-espaco-imagem">
            <img src="https://media-public.canva.com/LrDro/MAGmDxLrDro/1/s3.jpg" alt="img1"></img>
          </div>
          <div className="primeira-espaco-imagem">
            <img src="https://media-public.canva.com/HzHr4/MAGmD3HzHr4/1/s3.jpg" alt="img2"></img>
          </div>
          <div className="primeira-espaco-imagem">
            <img src="https://media-public.canva.com/ZraRY/MAGmD3ZraRY/1/s3.jpg" alt="img3"></img>
          </div>
        </section>

        <p className="primeira-chamada">Cadastre-se e publique sua Própria matéria</p>
      </main>
    </>
  );
}
