import { useEffect, useState } from "react";
import { apiRequest, getResponseData } from "./services/api";
import "./style/pedidosRecebidos.css";

const avatar = "https://media-public.canva.com/0dv4k/MAD3tT0dv4k/1/s3.jpg";

export default function PedidosRecebidos() {
  const [amigos, setAmigos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPedidos() {
      try {
        const response = await apiRequest("/api/users/aprovacao");
        setAmigos(getResponseData(response) || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPedidos();
  }, []);

  const handleResposta = async (friendId, approved) => {
    setError("");

    try {
      await apiRequest(approved ? "/api/users/aprovacao" : "/api/users/reprovacao", {
        method: "POST",
        body: JSON.stringify({ friendId }),
      });
      setAmigos((currentFriends) => currentFriends.filter((friend) => friend._id !== friendId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <section className="pedidos-lista" aria-label="Pedidos recebidos">
        <h2>PEDIDOS RECEBIDOS</h2>
        {loading && <p>Carregando pedidos...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && amigos.length === 0 && <p>Nenhum pedido recebido.</p>}
        {amigos.map((amigo) => (
          <div className="pedidos-item" key={amigo._id}>
            <img src={amigo.imagem || avatar} alt="" />
            <p>{amigo.name}</p>
            <div className="pedidos-acoes">
              <button className="pedidos-botao pedidos-aceitar" type="button" onClick={() => handleResposta(amigo._id, true)}>
                Aceitar
              </button>
              <button className="pedidos-botao pedidos-rejeitar" type="button" onClick={() => handleResposta(amigo._id, false)}>
                Rejeitar
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
