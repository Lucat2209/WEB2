import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/admin/categoria";

const DataManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ nome: "", descricao: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      // Ajuste aqui se a resposta tiver outro formato
      setData(response.data.data || response.data);
    } catch (err) {
      setError(err.message || "Erro ao buscar categorias");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      await fetchData();
      resetForm();
    } catch (err) {
      setError(err.message || "Erro ao salvar categoria");
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditingId(item.id);
    setFormData({ nome: item.nome, descricao: item.descricao });
  };

  const resetForm = () => {
    setFormData({ nome: "", descricao: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      await fetchData();
    } catch (err) {
      setError(err.message || "Erro ao deletar categoria");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>Erro: {error}</p>;

  return (
    <div className="app-container" style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <div className="cadastro-container" style={{ marginBottom: 40 }}>
        <h1>{isEditing ? "Atualizar Categoria" : "Cadastrar Nova Categoria"}</h1>
        <form onSubmit={handleSubmit} className="input-box" style={{ maxWidth: 400 }}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome da categoria"
            required
            style={{ width: "100%", padding: 8, marginBottom: 16 }}
          />

          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição da categoria"
            required
            style={{ width: "100%", padding: 8, marginBottom: 16, resize: "vertical" }}
          />

          <button type="submit" style={{ padding: "10px 20px" }}>
            {isEditing ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>

      <hr style={{ margin: "40px 0", border: "1px solid #ddd" }} />

      <div className="consulta-container" style={{ maxWidth: 600 }}>
        <h2>Lista de Categorias</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.length === 0 && <li>Nenhuma categoria cadastrada.</li>}
          {data.map(item => (
            <li key={item.id} style={{ marginBottom: 12, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
              <strong>{item.nome}</strong> (ID: {item.id})<br />
              <em>{item.descricao}</em><br />
              <button onClick={() => handleEdit(item)} style={{ marginRight: 10 }}>
                Editar
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ color: "red" }}>
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
