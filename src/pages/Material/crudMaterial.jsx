import React, { useState, useEffect } from "react";
import api from "axios";

const Material = () => {
    const [vcrudMaterial, setCrudMaterial] = useState([]);
    const [vnome, setNome] = useState('');
    const [vtipo, setTipo] = useState('');
    const [vdesc, setDesc] = useState('');
    const [vquant, setQuant] = useState('');
    const [vdatacadastro, setDatacadastro] = useState('');
    const [vdatadi, setDatadi] = useState('');

    // Carrega os materiais cadastrados ao montar o componente
    useEffect(() => {
        api.get("http://localhost:8080/api/v1/admin/material")
            .then((res) => {
                setCrudMaterial(res.data);
                console.log(res.data);
            })
            .catch(err => console.error("Erro ao buscar Material", err));
    }, []);

    // Função para enviar o novo material
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("http://localhost:8080/api/v1/admin/material", {
            //const response = await api.post("http://localhost:3001/crudMaterial", {
                nome: vnome,
                tipoMaterial: vtipo,
                descricao: vdesc,
                quantidade: vquant,
                datacadastro: vdatacadastro,
                dataDisponibilidade: vdatadi,
                codStatus: 1

            });
            console.log(response.data);
            // Após cadastrar o material, você pode adicionar à lista sem precisar recarregar
            setCrudMaterial(prevMaterials => [...prevMaterials, response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="app-container">
            <div className="main-content">
                <p>Cadastro de Material</p>
            </div>

            <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} value={vnome} />

                <label>Tipo</label>
                <input type="text" placeholder="Tipo" onChange={(e) => setTipo(e.target.value)} value={vtipo} />

                <label>Descrição</label>
                <input type="text" placeholder="Descrição" onChange={(e) => setDesc(e.target.value)} value={vdesc} />

                <label>Quantidade</label>
                <input type="number" placeholder="Quantidade" onChange={(e) => setQuant(e.target.value)} value={vquant} />

                <label>Data de cadastro</label>
                <input type="date" placeholder="Data de cadastro" onChange={(e) => setDatacadastro(e.target.value)} value={vdatacadastro} />

                <label>Data de disponibilidade</label>
                <input type="date" placeholder="Data de disponibilidade" onChange={(e) => setDatadi(e.target.value)} value={vdatadi} />

                <div className="form-group">
                    <button type="submit">Cadastrar Material</button>
                </div>
            </form>

            <div className="main-content">
                <p>Material Cadastrado</p>
            </div>

            <ul>
                {vcrudMaterial.map(mat => (
                    <li key={mat.id}> Nome = {mat.nome}| Descrição = {mat.descricao}| Tipo Material = {mat.tipoMaterial}</li>
                ))}
            </ul>
        </div>
    );
}

export default Material;
