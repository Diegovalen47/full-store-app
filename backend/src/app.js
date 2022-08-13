import express from 'express';
import config from './config';
import productRoutes from './routes/product.routes'
import cors from 'cors';

const app = express();

app.set('port', config.port)

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(productRoutes)

app.use(cors({origin: 'http://localhost:3000'}))

export default app;
