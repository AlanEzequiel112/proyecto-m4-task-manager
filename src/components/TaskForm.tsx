import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string, description: string) => Promise<void>;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);

    await onAddTask(title, description);

    setTitle("");
    setDescription("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Crear tarea"}
      </button>
    </form>
  );
}