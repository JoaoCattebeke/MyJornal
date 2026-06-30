import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { apiRequest, saveSession } from "./services/api";
import "./style/cadastro.css";

export default function FormCadastro() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    senha: "",
    confirmarsenha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeValue = (event) => {
    setDataForm((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (dataForm.senha !== dataForm.confirmarsenha) {
      setError("As senhas nao conferem.");
      return;
    }

    setLoading(true);

    try {
      const session = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: dataForm.username,
          email: dataForm.email,
          password: dataForm.senha,
        }),
      });

      saveSession(session);
      navigate("/logado", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container form-card">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nome</label>
          <input id="username" name="username" value={dataForm.username} onChange={handleChangeValue} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={dataForm.email} onChange={handleChangeValue} />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input id="senha" name="senha" type="password" value={dataForm.senha} onChange={handleChangeValue} />
        </div>
        <div>
          <label htmlFor="confirmarsenha">Confirmar Senha</label>
          <input id="confirmarsenha" name="confirmarsenha" type="password" value={dataForm.confirmarsenha} onChange={handleChangeValue} />
        </div>
        {error && <p role="alert">{error}</p>}
        <div>
          <button type="submit" disabled={loading}>{loading ? "Cadastrando..." : "Submit"}</button>
          <Button href="/" className="back-button">Voltar</Button>
        </div>
      </form>
    </div>
  );
}
