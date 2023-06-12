import React, { useState, useEffect } from 'react';
import editImage from '../img/editar.png';
import deleteImage from '../img/excluir.png';

const EventsForm = () => {
  const [event, setEvent] = useState({
    idHead: '',
    nome: '',
    data: '',
    tipoLogradouro: '',
    logradouro: '',
    numeroLogradouro: '',
    faturamento: '',
    quantidadeCaixas: ''
  });

  const [events, setEvents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch('http://ec2-52-201-73-66.compute-1.amazonaws.com/api/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingEventId) {
      fetch(`http://ec2-52-201-73-66.compute-1.amazonaws.com/api/events/${editingEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.ok) {
            console.log('Evento atualizado com sucesso');
            setEvent({
              idHead: '',
              nome: '',
              data: '',
              tipoLogradouro: '',
              logradouro: '',
              numeroLogradouro: '',
              faturamento: '',
              quantidadeCaixas: ''
            });
            setEditingEventId(null);
            fetchEvents();
          } else {
            console.error('Erro ao atualizar evento');
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    } else {
      fetch('http://ec2-52-201-73-66.compute-1.amazonaws.com/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
        .then((response) => {
          setIsSubmitting(false);
          if (response.ok) {
            console.log('Evento adicionado com sucesso');
            setEvent({
              idHead: '',
              nome: '',
              data: '',
              tipoLogradouro: '',
              logradouro: '',
              numeroLogradouro: '',
              faturamento: '',
              quantidadeCaixas: ''
            });
            fetchEvents();
          } else {
            console.error('Erro ao adicionar evento');
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    }
  };

  const handleEdit = (eventId) => {
    const eventToEdit = events.find((event) => event._id === eventId);
    if (eventToEdit) {
      setEvent(eventToEdit);
      setEditingEventId(eventId);
    }
  };

  const handleDelete = (eventId) => {
    fetch(`http://ec2-52-201-73-66.compute-1.amazonaws.com/api/events/${eventId}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Evento removido com sucesso');
        fetchEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Id Head:</label> <br/>
        <input type="number" name="idHead" value={event.idHead} onChange={handleChange} className='inputs' required/> <br/>
        <label>Nome:</label> <br/>
        <input type="text" name="nome" value={event.nome} onChange={handleChange} className='inputs' pattern="[A-Za-z\s]+" title="Apenas letras são permitidas" required/> <br/>
        <label>Data:</label> <br/>
        <input type="date" name="data" value={event.data} onChange={handleChange} className='inputs' required/> <br/>
        <label>Tipo de Logradouro:</label> <br/>
        <input type="text" name="tipoLogradouro" value={event.tipoLogradouro} onChange={handleChange} className='inputs' required/> <br/>
        <label>Logradouro:</label> <br/>
        <input type="text" name="logradouro" value={event.logradouro} onChange={handleChange} className='inputs' required/> <br/>
        <label>Número do Logradouro:</label> <br/>
        <input type="number" name="numeroLogradouro" value={event.numeroLogradouro} onChange={handleChange} className='inputs' required/> <br/>
        <label>Faturamento:</label> <br/>
        <input type="text" name="faturamento" value={event.faturamento} onChange={handleChange} className='inputs' required/> <br/>
        <label>Quantidade de Caixas:</label> <br/>
        <input type="number" name="quantidadeCaixas" value={event.quantidadeCaixas} onChange={handleChange} className='inputs' required/> <br/>
        <button type="submit" disabled={isSubmitting} className='saveButton'>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      <h1 className='listTitle'>Lista de Eventos:</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.nome}
            <button className='iconsImg' onClick={() => handleEdit(event._id)}><img src={editImage} className='icons' alt="Editar"/></button>
            <button className='iconsImg' onClick={() => handleDelete(event._id)}><img src={deleteImage} className='icons' alt="Excluir"/></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsForm;
