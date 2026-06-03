import { useState } from "react";
import { logoutUser } from "../features/auth/auth.service";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { sendTaskSummary } from "../services/email.service";

export function DashboardPage() {
  const { user } = useAuth();
  const { tasks, loading, error, addTask, toggleTask, removeTask } = useTasks();

  const [emailStatus, setEmailStatus] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  const handleSendSummary = async () => {
    if (!user?.email) {
      setEmailStatus("No se encontró el email del usuario.");
      return;
    }

    setEmailStatus("");
    setIsSendingEmail(true);

    try {
      await sendTaskSummary({
        email: user.email,
        tasks,
      });

      setEmailStatus("Resumen enviado correctamente.");
    } catch {
      setEmailStatus("No se pudo enviar el resumen.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <main>
      <header>
        <h1>Mis tareas</h1>
        <p>Sesión iniciada como: {user?.email}</p>

        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <section>
        <h2>Resumen por email</h2>

        <button
          type="button"
          onClick={handleSendSummary}
          disabled={isSendingEmail || tasks.length === 0}
        >
          {isSendingEmail ? "Enviando..." : "Enviar resumen por email"}
        </button>

        {emailStatus && <p>{emailStatus}</p>}
      </section>

      <TaskForm onAddTask={addTask} />

      {loading && <p>Cargando tareas...</p>}
      {error && <p>{error}</p>}

      {!loading && (
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={removeTask}
        />
      )}
    </main>
  );
}