import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string, description: string) => Promise<void>;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage("El título es obligatorio.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage("La descripción es obligatoria.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    await onAddTask(title.trim(), description.trim());

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

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Crear tarea"}
      </button>
    </form>
  );
}