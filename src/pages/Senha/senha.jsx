import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/stylegeral.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Por favor, insira seu e-mail.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/forgot-password", { email });

      setMessage(
        "Se esse e-mail estiver cadastrado, você receberá instruções para resetar sua senha."
      );
    } catch (err) {
      console.error("Erro ao enviar pedido de recuperação:", err);
      setError("Erro ao tentar enviar o pedido. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="remember-forgot">
      <form onSubmit={handleSubmit}>
        <h2>Esqueceu sua senha?</h2>
        <p>Informe seu e-mail para receber instruções de recuperação.</p>

        <div className="input-box">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="bx bxs-envelope"></div>
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="btn">
          <button type="submit">Enviar</button>
        </div>

        <div className="register-link">
          <p>
            Lembrou a senha? <Link to="/login">Voltar ao login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
