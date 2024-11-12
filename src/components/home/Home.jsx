import React from 'react';
import './Home.css';
import icone1 from '../imagens/file.png';
import iconeNegativo from '../imagens/negativo.png';
import iconePositivo from '../imagens/positivo.png';
import iconeFoguete from '../imagens/foguete.png';
import iconeUser from '../imagens/user.png'

const Home = () => {
  return (
    <div className="home">
      {/* Cabeçalho */}
      <header className="header">
        <img src={icone1} alt="Logo" className="logo" />
        <h1 className="title">QUEST INVEST</h1>
        <img src={iconeUser} alt="User" className="iconUser" />

      </header>

      {/* Conteúdo Principal */}
      <div className="content">
        <div className="welcome-section">
          <p>Boa noite <strong>*usuário*</strong>!</p>
          <hr />
          <div className="finance-info">
            <div className="finance-box green">
              <p>Sua economia mensal:</p>
              <span>R$ 10.000,00</span>
            </div>
            <div className="finance-box brown">
              <p>Sua despesa mensal:</p>
              <span>R$ 10.000,00</span>
            </div>
          </div>
        </div>

        <div className="quick-access">
          <p>Acesso rápido de cadastro:</p>
          <hr />
          <div className="action-buttons">
            <div className="action-button">
              <img src={iconeNegativo} alt="Despesas" />
              <span>Despesas</span>
            </div>
            <div className="action-button">
              <img src={iconePositivo} alt="Economia" />
              <span>Economia</span>
            </div>
            <div className="action-button">
              <img src={iconeFoguete} alt="Metas" />
              <span>Metas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
