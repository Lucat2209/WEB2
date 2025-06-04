import React, { useState, useEffect } from "react";
import api from "../../services/api";
import '../css/stylegeral.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Usuario = () => {
  const [vusuarios, setUsuarios] = useState([]);
  const [vnome, setNome] = useState('');
  const [vemail, setEmail] = useState('');
  const [vsenha, setSenha] = useState('');
  const [vconfirmarSenha, setConfirmarSenha] = useState('');
  const [vtelefone, setTelefone] = useState('');
  const [erroSenha, setErroSenha] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:3001/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários", err);
    }
  };

  // Validações da senha
  const validaSenha = {
    temTamanho: vsenha.length >= 6,
    temMaiuscula: /[A-Z]/.test(vsenha),
    temNumero: /\d/.test(vsenha),
    temEspecial: /[@]/.test(vsenha) // só o @
  };

  // Atualiza o erro da confirmação em tempo real
  useEffect(() => {
    setErroSenha(vconfirmarSenha !== "" && vsenha !== vconfirmarSenha);
  }, [vsenha, vconfirmarSenha]);

  // Máscara de telefone (formato brasileiro)
  const formatarTelefone = (valor) => {
    const apenasDigitos = valor.replace(/\D/g, "");
    if (apenasDigitos.length <= 10) {
      return apenasDigitos.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    } else {
      return apenasDigitos.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }
  };

  const handleTelefoneChange = (e) => {
    const valorFormatado = formatarTelefone(e.target.value);
    setTelefone(valorFormatado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vnome || !vemail || !vsenha || !vconfirmarSenha) {
      alert("Preencha todos os campos obrigatórios: Nome, E-mail, Senha e Confirmar Senha.");
      return;
    }

    if (vsenha !== vconfirmarSenha) {
      setErroSenha(true);
      alert("As senhas não coincidem.");
      return;
    }

    if (!validaSenha.temTamanho || !validaSenha.temMaiuscula || !validaSenha.temNumero || !validaSenha.temEspecial) {
      alert("A senha não atende a todos os requisitos.");
      return;
    }

    // Verifica se o e-mail já está cadastrado
    const emailExiste = vusuarios.some(usuario => usuario.email.toLowerCase() === vemail.toLowerCase());
    if (emailExiste) {
      alert("Este e-mail já está cadastrado. Por favor, use outro e-mail.");
      return;
    }

    try {
      await api.post("http://localhost:3001/usuarios", {
        nome: vnome,
        email: vemail,
        senha: vsenha,
        telefone: vtelefone
      });

      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      setTelefone('');

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container_login">
      <form className="login" onSubmit={handleSubmit}>
        <h1>Cadastro de Usuário</h1>

        <label>Nome*</label>
        <input
          type="text"
          placeholder="Nome"
          value={vnome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Email*</label>
        <input
          type="email"
          placeholder="E-mail"
          value={vemail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha*</label>
        <input
          type="password"
          placeholder="Senha"
          value={vsenha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {/* Validação da senha (aparece só enquanto usuário digita) */}
        {vsenha.length > 0 && (
          <div className="senha-requisitos">
            <p><strong>A senha deve conter:</strong></p>
            <ul>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  className="icone"
                  style={{ color: validaSenha.temTamanho ? "green" : "red", minWidth: '20px' }}
                >
                  {validaSenha.temTamanho ? "✔" : "✘"}
                </span>
                <span>Pelo menos 6 caracteres</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  className="icone"
                  style={{ color: validaSenha.temMaiuscula ? "green" : "red", minWidth: '20px' }}
                >
                  {validaSenha.temMaiuscula ? "✔" : "✘"}
                </span>
                <span>Uma letra maiúscula</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  className="icone"
                  style={{ color: validaSenha.temNumero ? "green" : "red", minWidth: '20px' }}
                >
                  {validaSenha.temNumero ? "✔" : "✘"}
                </span>
                <span>Um número</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  className="icone"
                  style={{ color: validaSenha.temEspecial ? "green" : "red", minWidth: '20px' }}
                >
                  {validaSenha.temEspecial ? "✔" : "✘"}
                </span>
                <span>O caractere especial @</span>
              </li>
            </ul>
          </div>
        )}

        <label>Confirmar Senha*</label>
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={vconfirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
          className={erroSenha ? "input-error" : ""}
        />
        {erroSenha && (
          <p className="error-message">As senhas não coincidem.</p>
        )}

        <label>Telefone (opcional)</label>
        <input
          type="text"
          placeholder="Telefone"
          value={vtelefone}
          onChange={handleTelefoneChange}
          maxLength={15}
        />

        <br /><br />
        <button type="submit">Cadastrar Usuário</button>

        <ul>
          {vusuarios.map(user => (
            <li key={user.id}>{user.nome} - {user.email}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Usuario;






/*import React, {useState} from "react";
import api from "../../services/api"
import '../css/stylegeral.css';
import { useEffect } from "react";
import axios from "axios";
 
 const Usuario=()=>{
 
    const[vusuarios,setUsuarios] = useState([]);
 
    const [vnome, setNome] = useState('')
    const [vemail, setEmail] = useState('')
    const [vsenha, setSenha] = useState('')
    const [vtelefone, setTelefone] = useState('')
 
 // Buscar usuarios cadastrados ao carregar a pagina  
useEffect(() => {
 
    axios.get("http://localhost:3001/usuarios")
    .then(res => setUsuarios(res.data))
    .catch(err => console.error("Erro ao buscar usuários",err))
  
}, []);
 
 
     const handleSubmit = async()=>{
        try{
            const response = await api.post("http://localhost:3001/usuarios",
            {nome: vnome, email: vemail, senha: vsenha, telefone: vtelefone })
            console.log(response.data)
       
        }catch(error){
            console.log(error)
        }
 
        }
return (
   
    <div className="app-container_login">
       
     
 
        <form class="login">
        <h1>Usuário</h1>
        <label>Nome{vnome}</label>
        <input type="text" placeholder="Nome" onChange={(e)=>setNome(e.target.value)}></input>
        <label>Email</label>
        <input type="text" placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)}></input>
        <label>Senha</label>
        <input type="password" placeholder="Senha" onChange={(e)=>setSenha(e.target.value)}></input>        
        <label>Telefone</label>
        <input type="text" placeholder="Telefone" onChange={(e)=>setTelefone(e.target.value)}></input>
   
        <div  className="form-group"> </div>
       
        <ul>
        {vusuarios.map(user => (
          <li key={user.id}> {user.password} - {user.email}</li>
        ))}
      </ul>
       
      <div  className="form-group">
        <button onClick={handleSubmit}>Cadastrar Usuário</button>
        </div>
 
 
     </form>
 
</div>
 
)
}
 
export default Usuario;*/