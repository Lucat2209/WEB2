import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Usuario = () => {
  const [vusuarios, setUsuarios] = useState([]);
  const [vnome, setNome] = useState('');
  const [vemail, setEmail] = useState('');
  const [vsenha, setSenha] = useState('');
  const [vconfirmarSenha, setConfirmarSenha] = useState('');
  const [vtelefone, setTelefone] = useState('');
  const [vcpf, setCpf] = useState('');
  const [erroSenha, setErroSenha] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8080/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários", err);
    }
  };

  const validaSenha = {
    temTamanho: vsenha.length >= 6,
    temMaiuscula: /[A-Z]/.test(vsenha),
    temNumero: /\d/.test(vsenha),
    temEspecial: /[@]/.test(vsenha)
  };

  useEffect(() => {
    setErroSenha(vconfirmarSenha !== "" && vsenha !== vconfirmarSenha);
  }, [vsenha, vconfirmarSenha]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vnome || !vemail || !vsenha || !vconfirmarSenha || !vcpf) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (vsenha !== vconfirmarSenha) {
      setErroSenha(true);
      alert("As senhas não coincidem.");
      return;
    }

    if (!validaSenha.temTamanho || !validaSenha.temMaiuscula || !validaSenha.temNumero || !validaSenha.temEspecial) {
      alert("Senha não atende aos requisitos.");
      return;
    }

    const emailExiste = vusuarios.some(u => u.email.toLowerCase() === vemail.toLowerCase());
    if (emailExiste) {
      alert("E-mail já cadastrado.");
      return;
    }

    // Log para verificar o valor de CPF
    console.log("CPF enviado:", vcpf);

    try {
      await axios.post("http://localhost:8080/api/v1/auth/register", {
        nome: vnome,
        email: vemail,
        password: vsenha,
        telefone: vtelefone,
        cpf: vcpf,
        role: "ADMIN"
      });

      alert("Cadastro realizado com sucesso!");
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      setTelefone('');
      setCpf('');
      navigate("/login");
    } catch (error) {
      if (error.response) {
        alert("Erro no cadastro: " + error.response.data.message);
      } else {
        alert("Erro no cadastro: " + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="app-container_login">
      <form className="login" onSubmit={handleSubmit}>
        <h1>Cadastro de Usuário</h1>

        <label>Nome*</label>
        <input type="text" value={vnome} onChange={e => setNome(e.target.value)} required />

        <label>Email*</label>
        <input type="email" value={vemail} onChange={e => setEmail(e.target.value)} required />

        <label>Senha*</label>
        <input type="password" value={vsenha} onChange={e => setSenha(e.target.value)} required />

        {vsenha.length > 0 && (
          <div>
            <p><strong>A senha deve conter:</strong></p>
            <ul>
              <li style={{ color: validaSenha.temTamanho ? 'green' : 'red' }}>Pelo menos 6 caracteres</li>
              <li style={{ color: validaSenha.temMaiuscula ? 'green' : 'red' }}>Uma letra maiúscula</li>
              <li style={{ color: validaSenha.temNumero ? 'green' : 'red' }}>Um número</li>
              <li style={{ color: validaSenha.temEspecial ? 'green' : 'red' }}>O caractere especial @</li>
            </ul>
          </div>
        )}

        <label>Confirmar Senha*</label>
        <input type="password" value={vconfirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />
        {erroSenha && <p style={{ color: 'red' }}>As senhas não coincidem.</p>}

      

        <label>Telefone</label>
        <input type="text" value={vtelefone} onChange={e => setTelefone(e.target.value)} />

        <label>CPF*</label>
        <input type="text" value={vcpf} onChange={e => setCpf(e.target.value)} required />

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