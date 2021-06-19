import { Router } from 'express';
import userController from '../controllers/products';

const router = Router();

router.get(`/list`, userController.products);
router.get(`/product`, userController.searchProduct);

export default router;
