import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import accountRouter from './routes/accountRouter.js';
import catRouter from './routes/catRouter.js';
import transactionRouter from './routes/transacationRouter.js';
import budgetRouter from './routes/budgetRouter.js';
import debtsRouter from './routes/debtsRouter.js';
import creditRouter from './routes/creditRouter.js';
import userRouter from './routes/userRouter.js';
import settingRouter from './routes/settingRoute.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));


connectDB();

app.get('/', (req,res)=>{
    res.send('hello world');
});

app.use('/', authRouter);
app.use('/api/data', accountRouter);
app.use('/api/data', catRouter);
app.use('/api/data', transactionRouter);
app.use('/api/data', budgetRouter);
app.use('/api/data', creditRouter);
app.use('/api/data', debtsRouter);
app.use('/api/data', userRouter);
app.use('/api/data', settingRouter);


app.listen(PORT, ()=>{
    console.log(`server is runnig on http://localhost:${PORT}/`)
});