import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { apiRequest, saveSession } from "./services/api";
import "./style/cadastro.css";

export default function FormLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataForm, setDataForm] = useState({
    email: "",
    senha: "",
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
    setLoading(true);

    try {
      const session = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: dataForm.email,
          password: dataForm.senha,
        }),
      });

      saveSession(session);
      navigate(location.state?.from?.pathname || "/logado", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container form-card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={dataForm.email} onChange={handleChangeValue} />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input id="senha" name="senha" type="password" value={dataForm.senha} onChange={handleChangeValue} />
        </div>
        {error && <p role="alert">{error}</p>}
        <div>
          <button type="submit" disabled={loading}>{loading ? "Entrando..." : "Submit"}</button>
          <Button href="/" className="back-button">Voltar</Button>
        </div>
      </form>
    </div>
  );
}
