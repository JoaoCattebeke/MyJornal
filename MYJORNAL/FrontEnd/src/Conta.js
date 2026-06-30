import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, clearSession, getLoggedUser, getResponseData } from "./services/api";
import "./style/cadastro.css";
import "./style/materia.css";

export default function Conta() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const loggedUser = getLoggedUser();

      if (!loggedUser?.id) {
        clearSession();
        navigate("/formLogin", { replace: true });
        return;
      }

      try {
        const response = await apiRequest(`/api/users/${loggedUser.id}`);
        setUser(getResponseData(response));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    clearSession();
    navigate("/", { replace: true });
  };

  return (
    <div className="form-container">
      <h1>Informacoes da conta</h1>
      {loading && <p>Carregando conta...</p>}
      {error && <p role="alert">{error}</p>}
      {user && (
        <form>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input id="username" name="username" value={user.name || ""} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={user.email || ""} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="role">Perfil</label>
            <input id="role" name="role" value={user.role || "user"} readOnly />
          </div>
          <button type="button" onClick={handleLogout}>Deslogar</button>
        </form>
      )}
    </div>
  );
}
