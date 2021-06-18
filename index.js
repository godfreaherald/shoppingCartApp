import express from 'express';
import productsRoute from './routes/products';
const PORT = 8090;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products', productsRoute);

app.use((req, res, next, error) => {
    error.status = 404;
    // next(error);
});

app.listen(PORT, () => {
    console.log('Server is running... on port ' + PORT);
});
