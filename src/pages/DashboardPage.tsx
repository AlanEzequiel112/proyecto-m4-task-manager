import { logoutUser } from "../features/auth/auth.service";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

export function DashboardPage() {
  const { user } = useAuth();
  const { tasks, loading, error, addTask, toggleTask, removeTask } = useTasks();

  const handleLogout = async () => {
    await logoutUser();
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