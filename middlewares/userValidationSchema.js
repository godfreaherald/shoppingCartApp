import Joi from 'joi';
import { BadRequest } from '../utils/errors';

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

const validateRequest = async (req, res, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    try {
        const { error, value } = await schema.validate(req.body, options);
        if (error) {
            const errorDetails = error.details.map((value) => {
                return {
                    error: value.message,
                    path: value.path
                };
            });

            throw new BadRequest(errorDetails);
        } else {
            console.log(value);
            req.body = value;
            next();
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};
