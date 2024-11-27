import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import icone1 from '../imagens/user.png';
import icone from '../imagens/icone.png';
import logo from '../imagens/file.png';
import { useUser } from '../page-icones/UserContext'; 

const UserProfile = () => {
  const navigate = useNavigate();
  const { userIcon } = useUser(); // pega o ícone do usuário

  return (
    <div className="user-profile">
      <header className="header">
        <img 
          src={logo} 
          alt="Logo" 
          className="logo" 
          onClick={() => navigate('/home')} 
          style={{ cursor: 'pointer' }}
        />
        <h1 className="title">Perfil do Usuário</h1>
        <img 
          src={userIcon || icone1} // exibe o ícone do usuário atualizado ou o ícone padrão do header se n houver icone
          alt="User" 
          className="iconUser" 
          onClick={() => navigate('/personalizar')}
          style={{ cursor: 'pointer' }}
        />
      </header>

      <div className="profile-content">
        <div className="profile-picture-section">
          <div className="profile-picture">
            <img src={userIcon || icone} alt="Foto do Usuário" className="user-icon" />
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
