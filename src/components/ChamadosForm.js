import React, { useState, useEffect } from 'react';
import editImage from '../img/editar.png';
import deleteImage from '../img/excluir.png';

const ChamadosForm = () => {
  const [chamado, setChamado] = useState({
    idCoordenador: '',
    idEvento: '',
    idCaixa: '',
    comentario: ''
  });

  const [chamados, setChamados] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingChamadoId, setEditingChamadoId] = useState(null);

  useEffect(() => {
    fetchChamados();
  }, []);

  const fetchChamados = () => {
    fetch('http://localhost:4000/api/chamados')
      .then((response) => response.json())
      .then((data) => setChamados(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    setChamado({ ...chamado, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingChamadoId) {
      fetch(`http://localhost:4000/api/chamados/${editingChamadoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chamado)
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.ok) {
            console.log('Chamado atualizado com sucesso');
            setChamado({
              idCoordenador: '',
              idEvento: '',
              idCaixa: '',
              comentario: ''
            });
            setEditingChamadoId(null);
            fetchChamados();
          } else {
            console.error('Erro ao atualizar chamado');
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    } else {
      fetch('http://localhost:4000/api/chamados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chamado)
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.ok) {
            console.log('Chamado adicionado com sucesso');
            setChamado({
              idCoordenador: '',
              idEvento: '',
              idCaixa: '',
              comentario: ''
            });
            fetchChamados();
          } else {
            console.error('Erro ao adicionar chamado');
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    }
  };

  const handleEdit = (chamadoId) => {
    const chamadoToEdit = chamados.find((chamado) => chamado._id === chamadoId);
    if (chamadoToEdit) {
      setChamado(chamadoToEdit);
      setEditingChamadoId(chamadoId);
    }
  };

  const handleDelete = (chamadoId) => {
    fetch(`http://localhost:4000/api/chamados/${chamadoId}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Chamado removido com sucesso');
        fetchChamados();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Id Coordenador:</label> <br/>
        <input type="text" name="idCoordenador" value={chamado.idCoordenador} onChange={handleChange} className='inputs' required/> <br/>
        <label>Id Evento:</label> <br/>
        <input type="text" name="idEvento" value={chamado.idEvento} onChange={handleChange} className='inputs' required/> <br/>
        <label>Id Caixa:</label> <br/>
        <input type="text" name="idCaixa" value={chamado.idCaixa} onChange={handleChange} className='inputs' required/> <br/>
        <label>Comentário:</label> <br/>
        <input type="text" name="comentario" value={chamado.comentario} onChange={handleChange} className='inputs' required/> <br/>
        <button type="submit" disabled={isSubmitting} className='saveButton'>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      <h1 className='listTitle'>Lista de Chamados:</h1>
      <ul>
        {chamados.map((chamado) => (
          <li key={chamado._id}>
            {chamado.idEvento}
            <button className='iconsImg' onClick={() => handleEdit(chamado._id)}><img src={editImage} className='icons' alt="Editar"/></button>
            <button className='iconsImg' onClick={() => handleDelete(chamado._id)}><img src={deleteImage} className='icons' alt="Excluir"/></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChamadosForm;
