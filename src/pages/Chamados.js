import React from 'react';
import NavBar from '../components/NavBarHome'
import ChamadosForm from '../components/ChamadosForm'

const Chamados = () => {
    return (
        <>
            <NavBar />
            <main className='container'>
                <h1>Adicionar chamado</h1>
                <ChamadosForm />
            </main>
        </>
    );
}

export default Chamados;