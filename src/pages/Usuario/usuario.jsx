import React, { useState, useEffect } from "react";
import api from "../../services/api";
import '../css/stylegeral.css';
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ IMPORTADO AQUI

const Usuario = () => {
    const [vusuarios, setUsuarios] = useState([]);
    const [vnome, setNome] = useState('');
    const [vemail, setEmail] = useState('');
    const [vsenha, setSenha] = useState('');
    const [vtelefone, setTelefone] = useState('');

    const navigate = useNavigate(); // ✅ INSTANCIADO AQUI

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vnome || !vemail || !vsenha || !vtelefone) {
            alert("Preencha todos os campos.");
            return;
        }

        try {
            await api.post("http://localhost:3001/usuarios", {
                nome: vnome,
                email: vemail,
                senha: vsenha,
                telefone: vtelefone
            });

            // Limpa os campos
            setNome('');
            setEmail('');
            setSenha('');
            setTelefone('');

            // Redireciona para a página de login
            navigate("/login"); // ✅ AQUI O REDIRECIONAMENTO

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="app-container_login">
            <form className="login" onSubmit={handleSubmit}>
                <h1>Cadastro de Usuário</h1>
                <label>Nome</label>
                <input type="text" placeholder="Nome" value={vnome} onChange={(e) => setNome(e.target.value)} />
                <label>Email</label>
                <input type="email" placeholder="E-mail" value={vemail} onChange={(e) => setEmail(e.target.value)} />
                <label>Senha</label>
                <input type="password" placeholder="Senha" value={vsenha} onChange={(e) => setSenha(e.target.value)} />
                <label>Telefone</label>
                <input type="text" placeholder="Telefone" value={vtelefone} onChange={(e) => setTelefone(e.target.value)}/>
<br />
<br />
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