import { useState } from "react";

interface TaskFormProps {
  onAddTask: (
    title: string,
    description: string,
    priority: "low" | "medium" | "high"
  ) => Promise<void>;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [priority, setPriority] = useState<
  "low" | "medium" | "high"
>("medium");

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

    await onAddTask(
       title.trim(),
       description.trim(),
       priority
    );

    setTitle("");
    setDescription("");
    setIsSubmitting(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>

      <input
        className="input"
        type="text"
        placeholder="Título"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        className="textarea"
        placeholder="Descripción"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

       <select
           className="input"
           value={priority}
           onChange={(event) =>
         setPriority(
             event.target.value as "low" | "medium" | "high"
       )
  }
>
  <option value="low">Prioridad baja</option>
  <option value="medium">Prioridad media</option>
  <option value="high">Prioridad alta</option>
</select>

      {errorMessage && <p>{errorMessage}</p>}

       <button
           className="btn-primary"
           type="submit"
           disabled={isSubmitting}
>
        {isSubmitting ? "Guardando..." : "Crear tarea"}
      </button>
    </form>
  );
}