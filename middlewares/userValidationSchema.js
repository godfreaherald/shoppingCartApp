import Joi from 'joi';
import { validateRequest } from './validation';

exports.validateRegistrationSchema = async function (req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required().min(6),
        middleName: Joi.string().required().min(6),
        lastName: Joi.string().required().min(6),
        email: Joi.string().required().email(),
        admin: Joi.number(),
        mobile: Joi.string().required().max(10),
        password: Joi.string().required().min(8).pattern(new RegExp(`^[a-zA-Z0-9]{8,15}$`))
    });

    validateRequest(req, res, next, schema);
};

exports.validateLoginSchema = async function (req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).pattern(new RegExp(`^[a-zA-Z0-9]{8,15}$`))
    });

    validateRequest(req, res, next, schema);
};
