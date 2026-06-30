import { useEffect, useState } from "react";
import { apiRequest, getResponseData } from "./services/api";
import "./style/logado.css";

const postImage = "https://media-public.canva.com/LrDro/MAGmDxLrDro/1/s3.jpg";

export default function MeusPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const response = await apiRequest("/api/post");
      setPosts(getResponseData(response) || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (postId) => {
    setError("");

    try {
      await apiRequest(`/api/post/${postId}`, {
        method: "DELETE",
      });
      setPosts((currentPosts) => currentPosts.filter((post) => post._id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <div className="logado-conteudo">
        <h2>MEUS POSTS</h2>
        {loading && <p>Carregando posts...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && posts.length === 0 && <p>Nenhum post encontrado.</p>}
        <section className="logado-publicacoes" aria-label="Meus posts">
          {posts.map((post) => (
            <article className="logado-publicacao" key={post._id}>
              <div className="logado-imagem-publicacao">
                <img src={post.urlImagem || postImage} alt="" />
              </div>
              <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span>{post.title}</span>
                <button
                  type="button"
                  aria-label={`Excluir ${post.title}`}
                  title="Excluir post"
                  onClick={() => handleDelete(post._id)}
                  style={{ border: 0, background: "transparent", cursor: "pointer", fontSize: "1.5rem" }}
                >
                  🗑
                </button>
              </h3>
            </article>
          ))}
        </section>
      </div>
  );
}
