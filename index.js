import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import productsRoute from './routes/products';
import userRoute from './routes/user';
import cartRoute from './routes/cart';
import categoryRoute from './routes/categories';

import handleErrors from './middlewares/handleErrors';
import { NotFound } from './utils/errors';

const PORT = 8090;
const { HOST_PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(`/products`, productsRoute);
app.use(`/user`, userRoute);
app.use(`/cart`, cartRoute);
app.use(`/category`, categoryRoute);

app.use((req, res, next) => {
    const error = new NotFound(`Not found`);
    next(error);
});

app.use(handleErrors);

app.listen(HOST_PORT || PORT, () => {
    console.log(`Server is running... on port ${HOST_PORT}` || PORT);
});
