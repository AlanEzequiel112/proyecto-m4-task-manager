import type { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (task: Task) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tenés tareas creadas.</p>;
  }

  return (
    <ul className="task-list"> 
      {tasks.map((task) => (
      <li className="task-card" key={task.id}>
  <div className="task-header">
    <h3>{task.title}</h3>

    <span
      className={
        task.completed
          ? "status-badge completed"
          : "status-badge pending"
      }
    >
      {task.completed ? "Completada" : "Pendiente"}
    </span>
  </div>

  <p>{task.description}</p>

  <button
    type="button"
    onClick={() => onToggleTask(task)}
  >
    {task.completed
      ? "Marcar pendiente"
      : "Marcar completada"}
  </button>

  <button
    type="button"
    onClick={() => onDeleteTask(task.id)}
  >
    Eliminar
  </button>
</li>
      ))}
    </ul>
  );
}