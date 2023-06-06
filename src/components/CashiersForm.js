import React, { useState, useEffect } from 'react';
import editImage from '../img/editar.png';
import deleteImage from '../img/excluir.png';

const CashiersForm = () => {
  const [cashier, setCashier] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    tipoLogradouro: '',
    logradouro: '',
    numeroLogradouro: '',
    telefone: '',
    sexo: ''
  });

  const [cashiers, setCashiers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCashierId, setEditingCashierId] = useState(null);

  useEffect(() => {
    fetchCashiers();
  }, []);

  const fetchCashiers = () => {
    fetch('http://localhost:4000/api/cashiers')
      .then((response) => response.json())
      .then((data) => setCashiers(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    setCashier({ ...cashier, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingCashierId) {
      fetch(`http://localhost:4000/api/cashiers/${editingCashierId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cashier)
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.ok) {
            console.log('Caixa atualizado com sucesso');
            setCashier({
              nome: '',
              email: '',
              dataNascimento: '',
              tipoLogradouro: '',
              logradouro: '',
              numeroLogradouro: '',
              telefone: '',
              sexo: ''
            });
            setEditingCashierId(null);
            fetchCashiers();
          } else {
            console.error('Erro ao atualizar caixa');
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    } else {
      fetch('http://localhost:4000/api/cashiers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cashier)
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.ok) {
            console.log('Caixa adicionado com sucesso');
            setCashier({
              nome: '',
              email: '',
              dataNascimento: '',
              tipoLogradouro: '',
              logradouro: '',
              numeroLogradouro: '',
              telefone: '',
              sexo: ''
            });
            fetchCashiers();
          } else {
            console.error('Erro ao adicionar caixa');
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    }
  };

  const handleEdit = (cashierId) => {
    const cashierToEdit = cashiers.find((cashier) => cashier._id === cashierId);
    if (cashierToEdit) {
      setCashier(cashierToEdit);
      setEditingCashierId(cashierId);
    }
  };

  const handleDelete = (cashierId) => {
    fetch(`http://localhost:4000/api/cashiers/${cashierId}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Caixa removido com sucesso');
        fetchCashiers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label> <br/>
        <input type="text" name="nome" value={cashier.nome} onChange={handleChange} className='inputs' pattern="[A-Za-z\s]+" title="Apenas letras são permitidas"  required/> <br/>
        <label>Email:</label> <br/>
        <input type="email" name="email" value={cashier.email} onChange={handleChange} className='inputs' pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title="Digite um email válido" required/> <br/>
        <label>Data de Nascimento:</label> <br/>
        <input type="date" name="dataNascimento" value={cashier.dataNascimento} onChange={handleChange} className='inputs' required/> <br/>
        <label>Tipo de Logradouro:</label> <br/>
        <input type="text" name="tipoLogradouro" value={cashier.tipoLogradouro} onChange={handleChange} className='inputs' required/> <br/>
        <label>Logradouro:</label> <br/>
        <input type="text" name="logradouro" value={cashier.logradouro} onChange={handleChange} className='inputs' required/> <br/>
        <label>Número do Logradouro:</label> <br/>
        <input type="number" name="numeroLogradouro" value={cashier.numeroLogradouro} onChange={handleChange} className='inputs' required/> <br/>
        <label>Telefone:</label> <br/>
        <input type="tel" name="telefone" value={cashier.telefone} onChange={handleChange} className='inputs' pattern="[0-9]{10,}" title="Digite um número de telefone válido" required/> <br/>
        <label>Sexo:</label> <br/>
        <input type="text" name="sexo" value={cashier.sexo} onChange={handleChange} className='inputs' pattern="[FM]"
  title="Digite 'F' para feminino ou 'M' para masculino" required/> <br/>
        <button type="submit" disabled={isSubmitting} className='saveButton'>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      <h1 className='listTitle'>Lista de Caixas:</h1>
      <ul>
        {cashiers.map((cashier) => (
          <li key={cashier._id}>
            {cashier.nome}
            <button className='iconsImg' onClick={() => handleEdit(cashier._id)}><img src={editImage} className='icons'></img></button>
            <button className='iconsImg' onClick={() => handleDelete(cashier._id)}><img src={deleteImage} className='icons'></img></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CashiersForm;
