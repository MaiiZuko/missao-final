import React, { useState } from 'react';
import './RegisterForm.css';
import icone1 from './imagens/file.png'; // Coloque a imagem icone1.png na pasta src/assets
import icone2 from './imagens/image.png'; // Coloque a imagem icone2.png na pasta src/assets

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="register-form-container">
      <div className="register-form">
        <div className="form-left">
          <img src={icone1} alt="Logo" className="form-logo" />
          <h2>Cadastre-se</h2>
          <p>Adicione seus dados:</p>
          <form>
            <input type="text" name="name" placeholder="Nome" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Senha" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Digite a senha novamente" onChange={handleChange} />
            <button type="submit">Confirma</button>
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
