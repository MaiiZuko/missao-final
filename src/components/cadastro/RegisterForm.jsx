import React, { useState } from 'react';
import './RegisterForm.css';
import icone1 from '../imagens/file.png';
import icone2 from '../imagens/image.png';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário

    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não correspondem!');
      return;
    }

    const { name, email, password } = formData;

    try {
      const response = await fetch('http://localhost:3001/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          email: email,
          senha: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Exibe a mensagem de sucesso
        // Você pode redirecionar ou limpar o formulário aqui
      } else {
        alert(result.error); // Exibe a mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao tentar cadastrar usuário');
    }
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
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Digite a senha novamente</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
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
