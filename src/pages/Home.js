import React from "react";
import NavBar from "../components/NavBarHome";
import "./styles/home.css";
import instaImg from "../img/instagram.png";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="homepage">
        <h1>Bem-vindo à Agência BOXE$</h1>
        <div className="containerHome">
          <div className="navLeft">
            <h2>Quem somos:</h2>
            <p>
              Bem-vindo à nossa empresa! Somos especializados em uma variedade
              de serviços para eventos, com foco no setor financeiro. Com uma
              equipe altamente qualificada e experiente, oferecemos soluções
              financeiras personalizadas para atender às necessidades
              específicas de cada evento. Nosso principal serviço é o financeiro
              em eventos, no qual cuidamos de todos os aspectos relacionados às
              finanças, garantindo uma gestão eficiente e transparente dos
              recursos financeiros envolvidos. Desde a elaboração do orçamento
              inicial até o controle preciso das receitas e despesas durante o
              evento, estamos comprometidos em proporcionar uma experiência
              tranquila e segura para nossos clientes.
            </p>
          </div>
          <aside className="services">
            <h2>Serviços disponíveis:</h2>
            <ul className="servicesList">
              <li>💰Financeiro em eventos</li>
              <li>📊Consultorias financeiras</li>
              <li>🚻Equipes de caixas / caixas bilíngues</li>
              <li>🆕Promotores / Recepção</li>
            </ul>
            
            
          </aside>
        </div>
    <footer className="footer">
         
        <a
          href="https://www.instagram.com/agencia.boxes/?igshid=MzRlODBiNWFlZA%3D%3D"
          target="_blank"
        >
          <img src={instaImg} className="instagram-icon"></img>
        </a>    
    </footer>
        
      </div>
    </div>
  );
};

export default Home;
