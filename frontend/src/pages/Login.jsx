import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          username: username,
          password: password,
        }
      );

      // simpan login ke localStorage
      localStorage.setItem("admin", JSON.stringify(response.data.admin));

      alert("Login berhasil");
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Username atau password salah");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "50px auto" }}>
      <h2>Login Admin</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
