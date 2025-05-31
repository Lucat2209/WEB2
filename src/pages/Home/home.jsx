import React, { useState, useEffect } from "react";
import api from "../../services/api";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca usuários ao carregar componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para buscar lista de usuários
  const fetchUsers = () => {
    setLoading(true);
    api.get("users")
      .then(response => {
        setUsers(response.data.data || response.data); // ajuste conforme sua API
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || "Erro ao carregar usuários");
        setLoading(false);
      });
  };

  // Função para excluir usuário pelo ID
  const handleDelete = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    api.delete(`users/${id}`)
      .then(() => {
        alert("Usuário excluído com sucesso!");
        // Atualiza lista após exclusão
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((err) => {
        alert("Erro ao excluir usuário: " + (err.message || ""));
      });
  };

  // Função para editar usuário — aqui só exibe alerta, implemente o que precisar
  const handleEdit = (user) => {
    alert(`Editar usuário: ${user.nome || user.name}`);
    // Exemplo: abrir modal, redirecionar para tela de edição, etc
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="user-manager-container">
      <h2>Gerenciamento de Usuários</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} style={{ marginBottom: 10 }}>
              <strong>{user.nome || user.name}</strong> - {user.email}
              <div style={{ display: "inline-flex", gap: 10, marginLeft: 10 }}>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ color: "red" }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserManager;
