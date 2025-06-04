import React, { useState, useEffect } from "react";
import api from "axios";

const Material = () => {
  const [vcrudMaterial, setCrudMaterial] = useState([]);
  const [vnome, setNome] = useState('');
  const [vcategoria, setCategoria] = useState('');
  const [vtipo, setTipo] = useState('');
  const [vdesc, setDesc] = useState('');

  // Estados de erro individual para cada campo
  const [erroNome, setErroNome] = useState('');
  const [erroCategoria, setErroCategoria] = useState('');
  const [erroTipo, setErroTipo] = useState('');

  useEffect(() => {
    api.get("http://localhost:8080/api/v1/admin/material")
      .then((res) => {
        setCrudMaterial(res.data);
        console.log(res.data);
      })
      .catch(err => console.error("Erro ao buscar Material", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetar erros
    setErroNome('');
    setErroCategoria('');
    setErroTipo('');

    // Validar campos individualmente
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

    if (!valid) return; // para o envio se tiver erro

    try {
      const response = await api.post("http://localhost:8080/api/v1/admin/material", {
        nome: vnome,
        tipoMaterial: vtipo,
        descricao: vdesc,
        categoria: vcategoria,
        codStatus: 1
      });

      setCrudMaterial(prevMaterials => [...prevMaterials, response.data]);

      // Limpar campos após cadastro
      setNome('');
      setCategoria('');
      setTipo('');
      setDesc('');
    } catch (error) {
      console.log(error);
      // Poderia colocar aqui mensagem geral de erro se quiser
    }
  }

  return (
    <div>
      <div className="main-content">
        <p>Cadastro de Material</p>
      </div>

      <div className="material">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Nome</label>
            <select
              onChange={(e) => setNome(e.target.value)}
              value={vnome}
              className="select-material"
            >
              <option value="">Selecione um material</option>
              <option value="Óleo de cozinha">Óleo de cozinha</option>
              <option value="Tampa de plástico">Tampa de plástico</option>
              <option value="Garrafa pet">Garrafa pet</option>
              <option value="Lata de Alumínio">Lata de Alumínio</option>
            </select>
            {erroNome && <p style={{ color: 'red', marginTop: '5px' }}>{erroNome}</p>}
          </div>

          <div className="input-box">
            <label>Categoria</label>
            <select
              onChange={(e) => setCategoria(e.target.value)}
              value={vcategoria}
              className="select-categoria"
            >
              <option value="">Selecione uma categoria</option>
              <option value="Recicláveis">Recicláveis</option>
              <option value="Resíduos">Resíduos</option>
            </select>
            {erroCategoria && <p style={{ color: 'red', marginTop: '5px' }}>{erroCategoria}</p>}
          </div>

          <div className="input-box">
            <label>Tipo</label>
            <input
              type="text"
              placeholder="Tipo"
              onChange={(e) => setTipo(e.target.value)}
              value={vtipo}
            />
            {erroTipo && <p style={{ color: 'red', marginTop: '5px' }}>{erroTipo}</p>}
          </div>

          <div className="input-box">
            <label>Descrição</label>
            <input
              type="text"
              placeholder="Descrição"
              onChange={(e) => setDesc(e.target.value)}
              value={vdesc}
            />
          </div>

          <div className="button">
            <button type="submit">Cadastrar Material</button>
          </div>
        </form>
      </div>

      <div className="main-content">
        <p>Material Cadastrado</p>
      </div>

      <ul>
        {vcrudMaterial.map(mat => (
          <li key={mat.id}>
            Nome = {mat.nome} | Descrição = {mat.descricao} | Tipo Material = {mat.tipoMaterial} | Quantidade = {mat.quantidade} | Categoria = {mat.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Material;



/*import React, { useState, useEffect } from "react";
import api from "axios";

const Material = () => {
    const [vcrudMaterial, setCrudMaterial] = useState([]);
    const [vnome, setNome] = useState('');
    const [vtipo, setTipo] = useState('');
    const [vdesc, setDesc] = useState('');
    const [vquant, setQuant] = useState('');

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


        <div>
            <div className="main-content">
                <p>Cadastro de Material</p>
            </div>

            <div className="material">

                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Nome</label>
                        <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} value={vnome} />
                    </div>

                    <div className="input-box">
                        <label>Tipo</label>
                        <input type="text" placeholder="Tipo" onChange={(e) => setTipo(e.target.value)} value={vtipo} />
                    </div>
                    <div className="input-box">
                        <label>Descrição</label>
                        <input type="text" placeholder="Descrição" onChange={(e) => setDesc(e.target.value)} value={vdesc} />
                    </div>
                    <div className="input-box">
                        <label>Quantidade</label>
                        <input type="number" placeholder="Quantidade" onChange={(e) => setQuant(e.target.value)} value={vquant} />
                    </div>

                    <div className="button">
                        <button type="submit">Cadastrar Material</button>
                    </div>
                </form>

            </div>

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

 <div className="input-box-quantidade">
                        <label>Quantidade</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="number"
                                placeholder="Quantidade"
                                onChange={(e) => setQuant(e.target.value)}
                                value={vquant}
                            />
                            <select onChange={(e) => setUnidade(e.target.value)} value={vunidade}>
                                <option value="kg">Kg</option>
                                <option value="L">Litros</option>
                            </select>
                        </div>
                    </div>


*/
