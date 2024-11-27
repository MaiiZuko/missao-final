import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import icone1 from '../imagens/file.png';
import icone2 from '../imagens/user.png';
import iconeNegativo from '../imagens/negativo.png';
import iconePositivo from '../imagens/positivo.png';
import iconeFoguete from '../imagens/foguete.png';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useUser } from '../page-icones/UserContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: '',
    categoria: ''
  });
  const [despesas, setDespesas] = useState([]);
  const [totalDespesa, setTotalDespesa] = useState(0);
  const [economias, setEconomias] = useState([]);
  const [totalEconomia, setTotalEconomia] = useState(0);
  const [metas, setMetas] = useState([]);
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

  const handleSubmit = () => {
    if (modalType === 'despesa') {
      const novaDespesa = {
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        data: formData.data,
        categoria: formData.categoria
      };
      setDespesas((prevDespesas) => [...prevDespesas, novaDespesa]);
      setTotalDespesa((prevTotal) => prevTotal + novaDespesa.valor);
      setSuccessMessage('Despesa adicionada com sucesso!');
    }

    if (modalType === 'economia') {
      const novaEconomia = {
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        data: formData.data,
        categoria: formData.categoria
      };
      setEconomias((prevEconomias) => [...prevEconomias, novaEconomia]);
      setTotalEconomia((prevTotal) => prevTotal + novaEconomia.valor);
      setSuccessMessage('Economia adicionada com sucesso!');
    }

    if (modalType === 'metas') {
      const novaMeta = {
        descricao: formData.descricao,
        data: formData.data,
        valor: parseFloat(formData.valor),
      };
      setMetas((prevMetas) => [...prevMetas, novaMeta]);
      setSuccessMessage('Meta adicionada com sucesso!');
    }

    closeModal();
  };

  const categorias = {
    '1': 'Saúde',
    '2': 'Moradia',
    '3': 'Vestuário',
    '4': 'Serviços',
    '5': 'Impostos',
    '6': 'Manutenção do veículo',
    '7': 'Doações',
    '8': 'Outros'
  };

  const despesasPorCategoria = despesas.reduce((acc, despesa) => {
    const categoria = categorias[despesa.categoria] || 'Outros';
    acc[categoria] = (acc[categoria] || 0) + despesa.valor;
    return acc;
  }, {});

  const dataGrafico = {
    labels: Object.keys(despesasPorCategoria),
    datasets: [
      {
        data: Object.values(despesasPorCategoria),
        backgroundColor: [
          '#d9f2d9',
          '#a3e4a3',
          '#71d171',
          '#4ec94e',
          '#36b336',
          '#2a9c2a',
          '#ffc107',
          '#006400'
        ],
        hoverBackgroundColor: [
          '#c8ebc8',
          '#8cd48c',
          '#66c166',
          '#4eb74e',
          '#33a033',
          '#289128',
          '#ffcd38',
          '#004f00'
        ]
      }
    ]
  };

  const optionsGrafico = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="home">
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

      <div className="content">
        <div className="welcome-section">
          <p>Boa noite <strong>*usuário*</strong>!</p>
          <hr />
          <div className="finance-info">
            <div className="finance-box green">
              <p>Sua economia mensal:</p>
              <span>R$ {totalEconomia.toFixed(2)}</span>
            </div>
            <div className="finance-box brown">
              <p>Sua despesa mensal:</p>
              <span>R$ {totalDespesa.toFixed(2)}</span>
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

      <div className="additional-sections">
        <div className="lista-metas">
          <h2>Metas</h2>
          <ul>
            {metas.map((meta, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`meta-${index}`}
                  name={`meta-${index}`}
                  style={{ marginRight: '10px' }}
                />
                <label htmlFor={`meta-${index}`}>
                  {meta.data} - {meta.descricao} - R$ {meta.valor ? meta.valor.toFixed(2) : '0.00'}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="lista-economias">
          <h2>Economia</h2>
          <ul>
            {economias.map((economia, index) => (
              <li key={index}>
                {economia.data} - R$ {economia.valor.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="grafico-despesas">
          <h2>Gráfico de Despesas</h2>
          <Pie data={dataGrafico} options={optionsGrafico} />
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

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
                <option value="8">Salário</option>
                <option value="9">Presente</option>
                <option value="10">Outros</option>
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
