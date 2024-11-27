import React, { useState } from 'react';
import './IconPage.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../page-icones/UserContext';
import icone1 from '../imagens/file.png';
import iconePrincipal from '../imagens/icone.png';
import iconeUser1 from '../imagens/imagem1.png';
import iconeUser2 from '../imagens/imagem2.png';
import iconeUser3 from '../imagens/imagem3.png';
import iconeUser4 from '../imagens/imagem4.png';
import iconeUser5 from '../imagens/imagem5.png';
import iconeUser6 from '../imagens/imagem6.png';

const IconPage = () => {
  const { setUserIcon } = useUser();
  const [selectedIcon, setSelectedIcon] = useState(iconePrincipal);
  const navigate = useNavigate();

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleSaveClick = () => {
    setUserIcon(selectedIcon); // salva o ícone selecionado do usuário
    navigate('/personalizar');
  };

  const iconOptions = [iconeUser1, iconeUser2, iconeUser3, iconeUser4, iconeUser5, iconeUser6];

  return (
    <div className="icon-page">
      <header className="header">
        <img src={icone1} alt="Logo" className="logo" />
        <h1 className="title">Escolha seu ícone</h1>
        <img 
          src={selectedIcon} 
          alt="User" 
          className="iconUser" 
          onClick={() => navigate('/personalizar')}
          style={{ cursor: 'pointer' }}
        />
      </header>

      <div className="profile-content">
        <div className="profile-picture-section">
          <div className="profile-picture">
            <img src={selectedIcon} alt="Foto do Usuário" className="user-icon" />
          </div>
        </div>
      
        <div className="icon-selection-content">
          <h2>Escolha seu ícone</h2>
          <hr />
          <div className="icon-selection">
            {iconOptions.map((icon, index) => (
              <img
                key={index}
                src={icon}
                alt={`Ícone ${index + 1}`}
                className="icon-option"
                onClick={() => handleIconClick(icon)}
              />
            ))}
          </div>
          <button type="button" className="save-button" onClick={handleSaveClick}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconPage;
