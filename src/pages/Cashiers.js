import NavBar from '../components/NavBarHome'
import CashiersForm from '../components/CashiersForm'

const Cashier = () => {
    return (
        <>
            <NavBar />
            <main className='container'>
                <h1>Adicionar Caixa:</h1>
                <CashiersForm />
            </main>
        </>
    );
}

export default Cashier;