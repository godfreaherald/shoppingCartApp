import { Router } from 'express';
import cart from '../controllers/cart';
import { validateCartItemSchema } from '../middlewares/CartItemValidation';
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post(`/add`, authenticate, validateCartItemSchema, cart.addToCart);

router.post(`/remove`, authenticate, validateCartItemSchema, cart.removeFromCart);

export default router;
