const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const router = require('./routes/routes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


