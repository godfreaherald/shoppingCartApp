import { Router } from 'express';
import users from '../controllers/users.js';
import { validateRegistrationSchema, validateLoginSchema } from '../middlewares/userValidationSchema';

const router = Router();

router.post(`/`, validateRegistrationSchema, users.create);

router.post(`/authentication`, validateLoginSchema, users.login);

router.get(`/users`, users.findAll);

router.get(`/:email`, users.findOne);

export default router;
