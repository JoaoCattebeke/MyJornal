import { useEffect, useState } from "react";
import { apiRequest, getResponseData } from "./services/api";
import "./style/pedidosRecebidos.css";

const avatar = "https://media-public.canva.com/0dv4k/MAD3tT0dv4k/1/s3.jpg";

export default function Amigos() {
  const [amigos, setAmigos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAmigos() {
      try {
        const response = await apiRequest("/api/users/friends");
        setAmigos(getResponseData(response) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAmigos();
  }, []);

  return (
    <div>
      <section className="pedidos-lista" aria-label="Amigos">
        <h2>AMIGOS</h2>
        {loading && <p>Carregando amigos...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && amigos.length === 0 && <p>Nenhum amigo encontrado.</p>}
        {amigos.map((amigo) => (
          <div className="pedidos-item" key={amigo._id}>
            <img src={amigo.imagem || avatar} alt="" />
            <p>{amigo.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
