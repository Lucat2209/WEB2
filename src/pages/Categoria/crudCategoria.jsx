import React, { useState, useEffect } from "react";
//import api from "../../services/api";

const DataManagement = () => {
  const [data, setData] = useState([]); // Dados da lista
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ nome: "", descricao: "" }); // Dados do formulário
  const [isEditing, setIsEditing] = useState(false); // Controle do estado de edição
  const [editingId, setEditingId] = useState(null); // ID do item sendo editado

  // Carregar os dados ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    api.get('categoria')
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  // Função para lidar com mudanças nos inputs do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para cadastrar ou atualizar um item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Atualiza o item existente
      api.put(`categoria/${editingId}`, formData)
        .then(() => {
          fetchData(); // Recarregar a lista
          resetForm();
        })
        .catch(error => setError(error.message));
    } else {
      // Cadastra um novo item
      api.post('categoria', formData)
        .then(() => {
          fetchData(); // Recarregar a lista
          resetForm();
        })
        .catch(error => setError(error.message));
    }
  };

  // Função para habilitar a edição de um item
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditingId(item.id); // Corrigir o ID do item a ser editado
    setFormData({ nome: item.nome, descricao: item.descricao });
  };

  // Função para resetar o formulário
  const resetForm = () => {
    setFormData({ nome: "", descricao: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  // Função para deletar um item
  const handleDelete = (id) => {
    api.delete(`categoria/${id}`)
      .then(() => fetchData())
      .catch(error => setError(error.message));
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="app-container">
      {/* Div para o formulário de cadastro */}
      <div className="input-box">
        <h1>{isEditing ? "Atualizar Categoria" : "Cadastrar Nova Categoria"}</h1>

        <form onSubmit={handleSubmit} className="material">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome da categoria"
            required
          />


          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição da categoria"
            
          />
          <button type="submit">{isEditing ? "Atualizar" : "Cadastrar"}</button>
        </form>
      </div>

      {/* Separador visual */}
      <hr style={{ margin: "40px 0", border: "1px solid #ddd" }} />

      {/* Div para consultas os dados de categorias (consulta) */}
      <div className="consulta-container">
        <h2>Lista de Categorias</h2>
        <ul>
          {data.map(item => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              {item.id} - {item.nome} - {item.descricao}
              <button onClick={() => handleEdit(item)} style={{ marginLeft: "10px" }}>
                Editar
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ marginLeft: "10px", color: "red" }}>
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataManagement;
