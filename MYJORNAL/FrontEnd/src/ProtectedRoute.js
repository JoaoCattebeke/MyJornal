import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "./services/api";
import MenuPrincipal from "./MenuPrincipal";

export default function ProtectedRoute() {
  const location = useLocation();

  // Protege todas as paginas internas. A verificacao local apenas decide se vale
  // tentar abrir a pagina; a seguranca real continua no backend, via JWT.
  if (!isAuthenticated()) {
    return <Navigate to="/formLogin" replace state={{ from: location }} />;
  }

  // Toda rota logada recebe o menu principal automaticamente por este wrapper.
  return (
    <>
      <MenuPrincipal />
      <Outlet />
    </>
  );
}
