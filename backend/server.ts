import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authroute from './routes/authRoute';
import { DbConnection } from './config/Db';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


DbConnection()

const PORT = process.env.PORT || 5000;

app.use('/api/v1/auth', authroute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
