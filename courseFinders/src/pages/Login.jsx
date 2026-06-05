import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>BC CourseFinder™</h2>
        <p style={styles.subtitle}>Sign in to your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">Login</button>
        </form>
        <p style={styles.link}>Don't have an account? <span onClick={() => navigate("/register")} style={styles.linkText}>Register</span></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" },
  card: { backgroundColor: "white", padding: "2rem", borderRadius: "12px", width: "360px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
  title: { color: "#8B0000", textAlign: "center", marginBottom: "0.25rem" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: "1.5rem" },
  input: { width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" },
  button: { width: "100%", padding: "0.75rem", backgroundColor: "#8B0000", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" },
  error: { color: "red", marginBottom: "1rem", fontSize: "14px" },
  link: { textAlign: "center", marginTop: "1rem", fontSize: "14px" },
  linkText: { color: "#8B0000", cursor: "pointer", fontWeight: "bold" },
};