import { useState } from "react";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./routes/ProtectedRoute";

type Page = "login" | "register";

function App() {
  const [page, setPage] = useState<Page>("login");
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main>
        <p>Cargando sesión...</p>
      </main>
    );
  }

  if (user) {
    return (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    );
  }

  return (
    <main>
      {page === "login" ? <LoginPage /> : <RegisterPage />}

      {page === "login" ? (
        <button type="button" onClick={() => setPage("register")}>
          Crear cuenta
        </button>
      ) : (
        <button type="button" onClick={() => setPage("login")}>
          Ya tengo cuenta
        </button>
      )}
    </main>
  );
}

export default App;