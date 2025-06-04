import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../css/stylegeral.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get("http://localhost:3001/usuarios", {
        params: {
          email: email,
          senha: password
        }
      });

      console.log("Resposta da API:", response);

      if (response.data && response.data.length > 0) {
        const usuario = response.data[0];
        if (usuario.email === email && usuario.senha === password) {
          navigate("/crudMaterial");
        } else {
          setError("Email ou senha inválidos!");
        }
      } else {
        setError("Email ou senha inválidos!");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError("Erro ao tentar fazer login. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="Cont">


      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="input-box">
          <input
            type="text"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="bx bxs-user"></div>
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setSenha(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="bx bxs-lock-alt"></div>
        </div>

        <div className="remember-forgot">
          <Link to="/forgot-password">Esqueceu sua senha?</Link>
        </div>

        <div className="btn"><button type="submit">Login</button></div>

        <br /><br />

        <label><input type="checkbox" /> Lembre-me</label>

        <div className="register-link">
          <p>Não tem uma conta? <Link to="/usuario">Cadastre-se.</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
