import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../css/stylegeral.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function getPayloadFromToken(token) {
    if (!token) return null;

    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log(email)
    console.log(password)

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate",
        {
          email: email,
          password: password
        }
      );

      console.log("Resposta da API:", response);

      localStorage.setItem("token", response.data.access_token); // Armazena o token no localStorage
      localStorage.setItem(
        "email",
        getPayloadFromToken(response.data.access_token).sub
      );
      navigate("/crudMaterial");

      /*if (response.data && response.data.length > 0) {
        const usuario = response.data[0];
        if (usuario.email === email && usuario.password === password) {
          navigate("/crudMaterial");
        } else {
          setError("Email ou senha inválidos!");
        }
      } 
      */
      /*
            if (response.data ){
             navigate("/crudMaterial");
            }
           
            
            else {
              setError("Email ou senha inválidos!");
            } */

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
            onChange={(e) => setPassword(e.target.value)}
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
