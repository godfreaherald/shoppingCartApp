import { Router } from 'express';
import products from '../controllers/products';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post(`/`, authenticate, products.create);

router.get(`/list`, products.findAll);

router.get(`/:sku`, products.findBySku);

export default router;
