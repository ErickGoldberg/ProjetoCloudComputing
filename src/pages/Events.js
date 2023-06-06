import React from 'react';
import NavBar from '../components/NavBarHome'
import EventsForm from '../components/EventsForm'

const Events = () => {
    return (
        <>
            <NavBar />
            <main className='container'>
                <h1>Adicionar evento</h1>
                <EventsForm />
            </main>
        </>
    );
}

export default Events;