import { logoutUser } from "../features/auth/auth.service";
import { useAuth } from "../hooks/useAuth";

export function DashboardPage() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <main>
      <h1>Mis tareas</h1>

      <p>Sesión iniciada como: {user?.email}</p>

      <button type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </main>
  );
}