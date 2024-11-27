import React, { useState } from 'react';
import './Login.css';
import icone1 from '../imagens/file.png';
import icone2 from '../imagens/image.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' }); // Altere "password" para "senha"
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redireciona para /home após login bem-sucedido
        navigate('/home');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao fazer login.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
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
          <h2>BEM-VINDO!</h2>
          <p className="sub">Entre com os dados da sua conta:</p>
          <form onSubmit={handleLogin}>
            <div className="input-a">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-a">
              <label htmlFor="senha">Senha</label> {/* Altere "password" para "senha" */}
              <input
                type="password"
                id="senha"
                name="senha" // Certifique-se de que o name corresponde ao backend
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="button-container">
              <button type="submit">Login</button>
              <button
                type="button"
                style={{ marginLeft: '10px' }}
                onClick={() => navigate('/cadastro')}
              >
                Cadastro
              </button>
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

export default Login;


