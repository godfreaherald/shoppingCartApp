import { GeneralError } from '../utils/errors';

const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        console.log(`error here`);
        console.log(err);
        return res.status(err.getCode()).json({
            meta: { status: `error`, message: err.message }
        });
    }
    console.log(`error here2`);
    console.log(err);
    return res.status(500).json({
        meta: { status: `error`, message: err.message }
    });
};

module.exports = handleErrors;
