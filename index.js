import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import productsRoute from './routes/products';

const PORT = 8090;
const { HOST_PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products', productsRoute);
app.use((req, res, next, error) => {
    // error.status = 404;
    // next(error);
});

app.listen(HOST_PORT || PORT, () => {
    console.log(`Server is running... on port ${HOST_PORT}` || PORT);
});
