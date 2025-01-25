import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users';
import cadastroRoutes from './routes/cadastro';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', userRoutes);
app.use('/api', cadastroRoutes);

// Rota de healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
