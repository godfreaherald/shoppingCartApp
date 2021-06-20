import Joi from 'joi';
import { validateRequest } from './validation';

exports.validateCartItemSchema = async function (req, res, next) {
    console.log(`testssts`, req.body);
    const schema = Joi.object({
        productId: Joi.number().required(),
        userId: Joi.number().required(),
        quantity: Joi.number().required(),
        subTotal: Joi.number().required()
    });

    validateRequest(req, res, next, schema);
};
