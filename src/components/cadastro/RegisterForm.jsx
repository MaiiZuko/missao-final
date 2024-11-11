import React, { useState } from 'react';
import './RegisterForm.css';
import icone1 from '../imagens/file.png';
import icone2 from '../imagens/image.png';


const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="register-form-wrapper">
      <div className="register-form-container">
        <div className="form-left">
          <div className="logo-container">
            <img src={icone1} alt="Logo" className="form-logo" />
            <span className="logo-text">QUEST INVEST</span>
          </div>
          <h2>Cadastre-se</h2>
          <p className="subtitle">Adicione seus dados:</p>
          <form>
            <div className="input-group">
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" name="name" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" name="password" onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Digite a senha novamente</label>
              <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} />
            </div>
            <div className="button-container">
              <button type="submit">Confirma</button>
            </div>
          </form>
        </div>
        <div className="form-right">
          <p>Organize seu dinheiro, alcance suas metas!</p>
          <img src={icone2} alt="Gráfico" className="form-graphic" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
