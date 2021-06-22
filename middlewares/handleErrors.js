import { GeneralError } from '../utils/errors';

const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        console.log(`Error ${err.getCode()}`, err.message);
        return res.status(err.getCode()).json({
            meta: { status: `error`, message: err.message }
        });
    } else {
        console.log(`Error 500`, err);

        return res.status(500).json({
            meta: { status: `error`, message: `Some problem occured while processing your request. If this persists consider conducting your server admin` }
        });
    }
};

module.exports = handleErrors;
