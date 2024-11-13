import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import icone1 from '../imagens/file.png';
import { useUser } from '../page-icones/UserContext'; // Importe o contexto

const UserProfile = () => {
  const navigate = useNavigate();
  const { userIcon } = useUser(); // Obtenha o ícone do usuário do contexto

  return (
    <div className="user-profile">
      {/* Cabeçalho */}
      <header className="header">
      <img 
          src={icone1} 
          alt="Logo" 
          className="logo" 
          onClick={() => navigate('/home')} // Redireciona para /home ao clicar
          style={{ cursor: 'pointer' }} // Adiciona o cursor de ponteiro
        />
        <h1 className="title">Perfil do Usuário</h1>
        <img 
          src={userIcon || icone1} // Usa o ícone do usuário ou um ícone padrão
          alt="User" 
          className="iconUser" 
          onClick={() => navigate('/personalizar')}
          style={{ cursor: 'pointer' }}
        />
      </header>

      {/* Conteúdo Principal */}
      <div className="profile-content">
        <div className="profile-picture-section">
          <div className="profile-picture">
            <img src={userIcon || icone1} alt="Foto do Usuário" className="user-icon" />
          </div>
          <button 
            className="add-photo-button" 
            onClick={() => navigate('/icones')}
          >
            +
          </button>
        </div>

        <div className="profile-info-section">
          <h2>Personalize o Perfil</h2>
          <hr />
          <form className="profile-form">
            <label>
              Login
              <input type="email" placeholder="usuario@gmail.com" />
            </label>
            <label>
              Nome
              <input type="text" placeholder="usuario nome" />
            </label>
            <label>
              Senha
              <input type="password" placeholder="********" />
            </label>
            <button type="submit" className="save-button">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
