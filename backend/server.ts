import express from 'express';
import cors from 'cors';
import authroute from './routes/authRoute';
import cookieParser from 'cookie-parser';
import { DbConnection } from './config/Db';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

console.log(process.env.MONGO_URL);
DbConnection();

// API routes
app.use('/api/v1/auth', authroute);

// Serve frontend static files from 'dist' folder
app.use(express.static(path.join(__dirname, '..', 'dist')));

// For all other routes, send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
