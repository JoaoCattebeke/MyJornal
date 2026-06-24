import Button from 'react-bootstrap/Button';
import './style/primeiraPagina.css'

export default function PrimeiraPagina(){
    return (
        <>
        <header class="cabecalho">
            <h1>MYJORNAL</h1>

            <nav class="menu" aria-label="Acesso">
                <span class="botao botao-cadastro"><Button href="/formCadastro" >Formulário Cadastro</Button></span>
                <span class="botao botao-login"><Button href='/formLogin' >Formulário Login</Button></span>
            </nav>
        </header>
        <main class="pagina-sem-login">
            <section class="imagens" aria-label="Destaques">
            <div class="espaco-imagem">
                <img src="https://media-public.canva.com/LrDro/MAGmDxLrDro/1/s3.jpg" alt="img1"></img>
            </div>
            <div class="espaco-imagem">
                <img src="https://media-public.canva.com/HzHr4/MAGmD3HzHr4/1/s3.jpg" alt="img2"></img>
            </div>
            <div class="espaco-imagem">
                <img src="https://media-public.canva.com/ZraRY/MAGmD3ZraRY/1/s3.jpg" alt="img3"></img>
            </div>
            </section>

            <p class="chamada">Cadastre-se e publique sua Própria matéria</p>
        </main>
        </>
    )
}
