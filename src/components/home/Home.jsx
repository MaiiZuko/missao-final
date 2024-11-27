import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Home.css';
import icone1 from '../imagens/file.png';
import icone2 from '../imagens/user.png';
import iconeNegativo from '../imagens/negativo.png';
import iconePositivo from '../imagens/positivo.png';
import iconeFoguete from '../imagens/foguete.png';
import { useUser } from '../page-icones/UserContext';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: '',
    categoria: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { userIcon } = useUser();

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType('');
    setFormData({
      descricao: '',
      valor: '',
      data: '',
      categoria: ''
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Função de envio da despesa (exemplo com fetch)
  const enviarDespesa = async (formData) => {
    if (!formData.descricao || !formData.valor || !formData.data || !formData.categoria) {
      setErrorMessage('Todos os campos devem ser preenchidos.');
      return;
    }

    // Exibe os dados que estão sendo enviados
    console.log('Dados a serem enviados:', formData);

    try {
      const response = await fetch('http://localhost:3001/api/despesas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Dados enviados no corpo da requisição
      });

      // Verifica a resposta do servidor
      const responseData = await response.json();
      console.log('Resposta do servidor:', responseData);

      if (response.ok) {
        setSuccessMessage('Despesa cadastrada com sucesso!');
        setErrorMessage('');
      } else {
        setErrorMessage(responseData.error || 'Erro ao cadastrar despesa.');
      }
    } catch (error) {
      setErrorMessage('Erro de comunicação com o servidor.');
      console.error('Erro de comunicação com o servidor:', error);
    }
  };

  const handleSubmit = () => {
    if (modalType === 'despesa') {
      enviarDespesa(formData);
    }
    closeModal();
  };

  return (
    <div className="home">
      {/* Cabeçalho */}
      <header className="header">
        <img src={icone1} alt="Logo" className="logo" />
        <h1 className="title">QUEST INVEST</h1>
        <img
          src={userIcon || icone2}
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

      {/* Mensagens de erro e sucesso */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Modal Popup */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar {modalType}</h2>
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                placeholder="Descrição"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Valor</label>
                <input
                  type="text"
                  name="valor"
                  value={formData.valor}
                  onChange={handleInputChange}
                  placeholder="R$ 0,00"
                />
              </div>
              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Categoria</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
              >
                <option value="">Selecione a categoria...</option>
                <option value="1">Saúde</option>
                <option value="2">Moradia</option>
                <option value="3">Vestuário</option>
                <option value="4">Serviços</option>
                <option value="5">Impostos</option>
                <option value="6">Manutenção do veículo</option>
                <option value="7">Doações</option>
                <option value="8">Outros</option>
              </select>
            </div>
            <button className="confirm-button" onClick={handleSubmit}>✔️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
