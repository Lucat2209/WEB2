import React, {useState} from "react";
import api from "../../services/api"
import '../css/stylegeral.css';
import { useEffect } from "react";
import axios from "axios";

// Simulando dados vindos de uma API ou arquivo
const dadosIniciais = [
  { nome: "João Silva", data: "2025-06-01T14:00" },
  { nome: "Maria Oliveira", data: "2025-06-03T10:30" },
  { nome: "Carlos Souza", data: "2025-06-05T16:15" },
];

function Agendamento() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    // Aqui poderia vir de uma API
    setAgendamentos(dadosIniciais);
  }, []);

  const excluir = (index) => {
    const novaLista = [...agendamentos];
    novaLista.splice(index, 1);
    setAgendamentos(novaLista);
  };

  return (
    <div className="container-agendamento">
  <h2>Andamento de Agendamentos</h2>
      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento no momento.</p>
      ) : (
        <ul>
          {agendamentos.map((ag, index) => (
            <li key={index}>
              <strong>{ag.nome}</strong> - {new Date(ag.data).toLocaleString()}{" "}
              <button onClick={() => excluir(index)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Agendamento;
