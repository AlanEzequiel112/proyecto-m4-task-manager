import { useState } from "react";
import { registerUser } from "../features/auth/auth.service";
import { getFirebaseAuthErrorMessage } from "../utils/firebaseErrors";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await registerUser(email, password);
    } catch (error) {
      setErrorMessage(getFirebaseAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
        />

        {errorMessage && <p>{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>
    </section>
  );
}