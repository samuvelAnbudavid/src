import express, { Express, Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import bodyParser from 'body-parser';
import cors from 'cors';


const app:Express = express()
app.use(cors({origin: '*',}))
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRoutes);

app.listen(3000,() => {
  console.log(process.env.PORT)
    console.log(`⚡️[server]: Server is running at http://localhost:${3000}`);
  });