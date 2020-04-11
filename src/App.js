import React, { useState, useEffect } from "react";
import api from './services/api.js'

import "./styles.css";

function App() {

  const [repositories, setrepositories] = useState([]);

  const [tecnologias, setTecnologias] = useState([]);

  const [tecnologia, setTecnologia] = useState("");

  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    api.get("/repositories").then(response => {
      setrepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title : titulo,
      url : url,
      techs : tecnologias
    });

    setrepositories([response.data, ...repositories])

    setTitulo("");
    setUrl("");
    setTecnologias([]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const repoIndex = repositories.findIndex(repo => repo.id === id)

    var repos = [...repositories];

    repos.splice(repoIndex, 1);

    setrepositories(repos)

  }

  function handleAddTecnologia() {
    setTecnologias([...tecnologias, tecnologia]);
    setTecnologia("");
  }

  return (
    <div>

<div>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título..."></input>
      </div>
      <div>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Url..."></input>
      </div>
      <div>
        <input type="text" value={tecnologia} onChange={(e) => setTecnologia(e.target.value)} placeholder="Tecnologia..."></input>

        <button onClick={handleAddTecnologia}>+</button>
      </div>
      <h3>
        Tecnologias:
      </h3>
      <ul>
        {
          tecnologias.map((tec, index) => <li key={index}>{index}- {tec}</li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>


      <ul data-testid="repository-list">
        {
          repositories.map(repositorio => {
            return (
              <li key={repositorio.id}>
                <div>
                {repositorio.title}
                <div>
                {repositorio.techs.length > 0 ? <h3>Tecnologias: </h3> : null}
                </div>
                <div>
                <ul>
                {
                  repositorio.techs.map((tecn, index) => (<li key={index}>{index}- {tecn}</li>))
                }
                </ul>
                </div>
                <button onClick={() => handleRemoveRepository(repositorio.id)}>
                  Remover
                </button>
                </div>
              </li>
            )
          })
        }
      </ul>

      
    </div>
  );
}

export default App;
