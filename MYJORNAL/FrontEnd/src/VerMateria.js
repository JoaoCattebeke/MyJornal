import { Link } from "react-router-dom";
import "./style/materia.css";

const postImage = "https://media-public.canva.com/LrDro/MAGmDxLrDro/1/s3.jpg";

export default function VerMateria() {
  const selectedPost = localStorage.getItem("myjornal_selected_post");
  const materia = selectedPost ? JSON.parse(selectedPost) : null;

  return (
    <main className="materia-conteudo">
      <section className="materia-noticia">
        <article className="materia-texto-noticia">
          <h1>{materia?.title || "Materia nao encontrada"}</h1>
          <p>{materia?.description || "Volte para a lista e selecione uma publicacao."}</p>
          <Link className="materia-botao-voltar" to="/logado">Voltar</Link>
        </article>
        <div className="materia-espaco-imagem" aria-label="Espaco reservado para imagem">
          <img src={materia?.urlImagem || postImage} alt="" />
        </div>
      </section>
    </main>
  );
}
