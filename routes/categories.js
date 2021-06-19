import { Router } from 'express';
import category from '../controllers/categories.js';
import authenticate from '../middlewares/authenticate';
const router = Router();

router.post(`/`, authenticate, category.create);

router.get(`/list`, category.findAll);

router.get(`/:id`, category.findById);
router.get(`/name/:category`, category.findByName);

export default router;
