import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { apiRequest } from "./services/api";
import "./style/cadastro.css";

export default function FormMateria() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    titulo: "",
    texto: "",
    soAmigos: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeValue = (event) => {
    const { checked, name, type, value } = event.target;

    setDataForm((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiRequest("/api/post", {
        method: "POST",
        body: JSON.stringify({
          title: dataForm.titulo,
          description: dataForm.texto,
          isPublic: !dataForm.soAmigos,
        }),
      });

      navigate("/logado");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container materia-form-container">
      <h1>Criar Materia</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input id="titulo" name="titulo" value={dataForm.titulo} onChange={handleChangeValue} />
        </div>
        <div className="form-group">
          <label htmlFor="texto">Texto</label>
          <textarea id="texto" name="texto" value={dataForm.texto} onChange={handleChangeValue} />
        </div>
        <div className="checkbox-field">
          <input
            id="soAmigos"
            type="checkbox"
            name="soAmigos"
            checked={dataForm.soAmigos}
            onChange={handleChangeValue}
          />
          <label htmlFor="soAmigos">So para amigos</label>
        </div>
        {error && <p role="alert">{error}</p>}
        <div>
          <button type="submit" disabled={loading}>{loading ? "Salvando..." : "Submit"}</button>
        </div>
      </form>
      <Button className="back-button" href="/logado">Voltar</Button>
    </div>
  );
}
