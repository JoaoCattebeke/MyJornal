import { useEffect, useState } from "react";
import { apiRequest, getResponseData } from "./services/api";
import "./style/pedidosRecebidos.css";

const avatar = "https://media-public.canva.com/0dv4k/MAD3tT0dv4k/1/s3.jpg";

export default function AdicionarAmigo() {
  const [amigos, setAmigos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadFriends = async () => {
    try {
      const response = await apiRequest("/api/users/availablefriends");
      setAmigos(getResponseData(response) || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFriends();
  }, []);

  const handleAdicionar = async (friendId) => {
    setError("");

    try {
      await apiRequest("/api/users/add_friend", {
        method: "POST",
        body: JSON.stringify({ friendId }),
      });
      setAmigos((currentFriends) => currentFriends.filter((friend) => friend._id !== friendId));
    } catch (err) {
      setError(err.message);
    }
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

  const amigosFiltrados = busca
    ? amigos.filter((amigo) =>
        `${amigo.name || ""} ${amigo.email || ""}`.toLowerCase().includes(busca),
      )
    : amigos;

  return (
    <div>
      <section className="pedidos-lista" aria-label="Adicionar amigos">
        <h2>ADICIONAR AMIGO</h2>
        <div className="pedidos-filtro">
          <input
            type="search"
            value={filtro}
            onChange={handleFiltroChange}
            onKeyDown={handleBuscar}
            placeholder="Buscar usuario"
            aria-label="Buscar usuario"
          />
        </div>
        {loading && <p>Carregando usuarios...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && amigosFiltrados.length === 0 && <p>Nenhum usuario disponivel.</p>}
        {amigosFiltrados.map((amigo) => (
          <div className="pedidos-item" key={amigo._id}>
            <img src={amigo.imagem || avatar} alt="" />
            <p>{amigo.name}</p>
            <div className="pedidos-acoes">
              <button className="pedidos-botao pedidos-aceitar" type="button" onClick={() => handleAdicionar(amigo._id)}>
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
