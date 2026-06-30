import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest, getResponseData } from "./services/api";
import "./style/logado.css";

const postImage = "https://media-public.canva.com/LrDro/MAGmDxLrDro/1/s3.jpg";

export default function Logado() {
  const [materias, setMaterias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await apiRequest("/api/post/list");
        setMaterias(getResponseData(response) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const handleClick = (materia) => {
    localStorage.setItem("myjornal_selected_post", JSON.stringify(materia));
  };

  const handleBuscar = (event) => {
    if (event.key === "Enter") {
      setBusca(filtro.trim().toLowerCase());
    }
  };

  const handleFiltroChange = (event) => {
    const value = event.target.value;
    setFiltro(value);

    if (!value.trim()) {
      setBusca("");
    }
  };

  const materiasFiltradas = busca
    ? materias.filter((materia) =>
        `${materia.title || ""} ${materia.description || ""}`
          .toLowerCase()
          .includes(busca),
      )
    : materias;

  return (
    <div className="logado-conteudo">
      <h1>PUBLICACOES</h1>
      <div className="logado-filtro">
        <input
          type="search"
          value={filtro}
          onChange={handleFiltroChange}
          onKeyDown={handleBuscar}
          placeholder="Buscar publicacoes"
          aria-label="Buscar publicacoes"
        />
      </div>
      {loading && <p>Carregando publicacoes...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && materiasFiltradas.length === 0 && <p>Nenhuma publicacao encontrada.</p>}
      <section className="logado-publicacoes logado-publicacoes-home" aria-label="Publicacoes recentes">
        {materiasFiltradas.map((materia) => (
          <article className="logado-publicacao logado-publicacao-home" key={materia._id}>
            <Link className="logado-card-noticia" to="/verMateria" onClick={() => handleClick(materia)}>
              <div className="logado-imagem-publicacao">
                <img src={materia.urlImagem || postImage} alt="" />
              </div>
              <h3>{materia.title}</h3>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
