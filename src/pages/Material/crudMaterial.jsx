import React, { useState, useEffect } from "react";
import axios from "axios";

const Material = () => {
  const [vcrudMaterial, setCrudMaterial] = useState([]);
  const [vnome, setNome] = useState('');
  const [vcategoria, setCategoria] = useState('');
  const [vtipo, setTipo] = useState('');
  const [vdesc, setDesc] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [categorias, setCategorias] = useState([]);

  const [erroNome, setErroNome] = useState('');
  const [erroCategoria, setErroCategoria] = useState('');
  const [erroTipo, setErroTipo] = useState('');

  useEffect(() => {
    fetchMateriais();
    fetchCategorias();
  }, []);

  const fetchMateriais = () => {
    axios.get("http://localhost:8080/api/v1/admin/material")
      .then(res => setCrudMaterial(res.data))
      .catch(err => console.error("Erro ao buscar materiais", err));
  };

  const fetchCategorias = () => {
    axios.get("http://localhost:8080/api/v1/admin/categoria")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Erro ao buscar categorias", err));
  };

  const resetForm = () => {
    setNome('');
    setCategoria('');
    setTipo('');
    setDesc('');
    setEditingId(null);

    setErroNome('');
    setErroCategoria('');
    setErroTipo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErroNome('');
    setErroCategoria('');
    setErroTipo('');

    let valid = true;
    if (!vnome.trim()) {
      setErroNome('O campo Nome é obrigatório.');
      valid = false;
    }
    if (!vcategoria.trim()) {
      setErroCategoria('O campo Categoria é obrigatório.');
      valid = false;
    }
    if (!vtipo.trim()) {
      setErroTipo('O campo Tipo é obrigatório.');
      valid = false;
    }
    if (!valid) return;

    const materialData = {
      nome: vnome,
      tipoMaterial: vtipo,
      descricao: vdesc,
      categoria: { id: parseInt(vcategoria) },
      codStatus: 1
    };

    try {
      if (editingId) {
        // Atualizar material
        await axios.put(`http://localhost:8080/api/v1/admin/material/${editingId}`, materialData);
        fetchMateriais();
        resetForm();
      } else {
        // Criar novo material
        const response = await axios.post("http://localhost:8080/api/v1/admin/material", materialData);
        setCrudMaterial(prev => [...prev, response.data]);
        resetForm();
      }
    } catch (error) {
      console.error("Erro ao salvar material:", error);
      alert("Erro ao salvar material.");
    }
  };

  const handleEdit = (mat) => {
    setNome(mat.nome);
    setCategoria(mat.categoria?.id ? String(mat.categoria.id) : String(mat.categoria));
    setTipo(mat.tipoMaterial);
    setDesc(mat.descricao || '');
    setEditingId(mat.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este material?")) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/admin/material/${id}`);
        setCrudMaterial(prev => prev.filter(m => m.id !== id));
      } catch (error) {
        console.error("Erro ao excluir material:", error);
        alert("Erro ao excluir material.");
      }
    }
  };

  // Função para pegar nome da categoria pelo id
  const getNomeCategoria = (categoria) => {
    if (!categoria) return "";
    if (typeof categoria === "object" && categoria.nome) return categoria.nome;
    // Se só veio id
    const catObj = categorias.find(c => c.id === (categoria.id || categoria));
    return catObj ? catObj.nome : categoria;
  };

  return (
    <div className="material-container">
      <div className="main-content">
        <h2>{editingId ? "Editar Material" : "Cadastro de Material"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="material-form">
        <div className="input-box">
          <label>Nome</label>
          <input
            type="text"
            value={vnome}
            onChange={(e) => setNome(e.target.value)}
          />
          {erroNome && <p style={{ color: 'red' }}>{erroNome}</p>}
        </div>

        <div className="input-box">
          <label>Categoria</label>
          <select
            value={vcategoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
          {erroCategoria && <p style={{ color: 'red' }}>{erroCategoria}</p>}
        </div>

        <div className="input-box">
          <label>Tipo</label>
          <input
            type="text"
            value={vtipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          {erroTipo && <p style={{ color: 'red' }}>{erroTipo}</p>}
        </div>

        <div className="input-box">
          <label>Descrição</label>
          <input
            type="text"
            value={vdesc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="button" style={{ marginTop: '10px' }}>
          <button type="submit">{editingId ? "Atualizar Material" : "Cadastrar Material"}</button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{ marginLeft: '10px', backgroundColor: '#ccc' }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="main-content" style={{ marginTop: '30px' }}>
        <h2>Materiais Cadastrados</h2>
      </div>

      <ul>
        {vcrudMaterial.map(mat => (
          <li key={mat.id} style={{ marginBottom: '10px' }}>
            <strong>{mat.nome}</strong> | Tipo: {mat.tipoMaterial} | Descrição: {mat.descricao} | Categoria: {getNomeCategoria(mat.categoria)}
            <button className="buttonEdicaoDelete" onClick={() => handleEdit(mat)} style={{ marginLeft: '15px' }}>Editar</button>
            <button className="buttonEdicaoDelete"
              onClick={() => handleDelete(mat.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Material;
