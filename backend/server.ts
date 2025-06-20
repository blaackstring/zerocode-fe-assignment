import express from 'express';
import cors from 'cors';
import authroute from './routes/authRoute';
import cookieParser from 'cookie-parser';
import { DbConnection } from './config/Db';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
 {
   origin:'http://localhost:5174',
   credentials:true
 }
));
app.use(express.json());
app.use(cookieParser());
console.log(process.env.MONGO_URL)
DbConnection()

// Example Route
app.use('/api/v1/auth', authroute);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
