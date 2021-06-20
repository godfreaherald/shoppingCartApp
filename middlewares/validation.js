import { BadRequest } from '../utils/errors';

exports.validateRequest = async (req, res, next, schema) => {
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
