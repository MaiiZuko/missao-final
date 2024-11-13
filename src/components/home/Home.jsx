import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useUser } from '../page-icones/UserContext'; // Importa o contexto
import icone1 from '../imagens/file.png';
import icone2 from '../imagens/user.png'
import iconeNegativo from '../imagens/negativo.png';
import iconePositivo from '../imagens/positivo.png';
import iconeFoguete from '../imagens/foguete.png';

const Home = () => {
  const [userIcon, setUserIcon] = useState(icone2); // Usa icone2 como o ícone padrão
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há um ícone salvo no localStorage
    const savedIcon = localStorage.getItem('userIcon');
    if (savedIcon) {
      setUserIcon(savedIcon);
    }
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType('');
  };

  return (
    <div className="home">
      {/* Cabeçalho */}
      <header className="header">
        <img src={icone1} alt="Logo" className="logo" />
        <h1 className="title">QUEST INVEST</h1>
        <img 
          src={userIcon} // Exibe o ícone do usuário armazenado no contexto
          alt="User" 
          className="iconUser" 
          onClick={() => navigate('/personalizar')}
          style={{ cursor: 'pointer' }}
        />
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
            <div className="action-button" onClick={() => openModal('despesa')}>
              <img src={iconeNegativo} alt="Despesas" />
              <span>Despesas</span>
            </div>
            <div className="action-button" onClick={() => openModal('economia')}>
              <img src={iconePositivo} alt="Economia" />
              <span>Economia</span>
            </div>
            <div className="action-button" onClick={() => openModal('metas')}>
              <img src={iconeFoguete} alt="Metas" />
              <span>Metas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar {modalType}</h2>
            <div className="form-group">
              <label>Descrição</label>
              <input type="text" placeholder="Descrição" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Valor</label>
                <input type="text" placeholder="R$ 0,00" />
              </div>
              <div className="form-group">
                <label>Data</label>
                <input type="date" />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Categoria</label>
              <select>
                <option>Buscar a categoria...</option>
              </select>
            </div>
            <button className="confirm-button" onClick={closeModal}>✔️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
