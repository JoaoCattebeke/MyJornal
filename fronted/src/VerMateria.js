import Button from 'react-bootstrap/Button';
import { ListaMaterias } from './db/dadosMaterias';
import './style/materia.css'


export default function VerMateria() {
    const materia = ListaMaterias[1];

    return (
            <>
            <header class="cabecalho">
                <h1>MYJORNAL</h1>
                <button class="botao botao-conta" type="button"><Button href='/logado'>Voltar</Button></button>
            </header>
            <main class="conteudo">
            <section class="noticia">
                <article class="texto-noticia">
                    <h2>{materia.titulo}</h2>
                    <p>{materia.texto}</p>
                </article>
                <div class="espaco-imagem" aria-label="Espaco reservado para imagem">
                    <img src="https://media-public.canva.com/LrDro/MAGmDxLrDro/1/s3.jpg" alt="img1"></img>
                    </div>
            </section>
            </main>
            </>
    );
}