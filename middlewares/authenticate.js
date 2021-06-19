import jwt from 'jsonwebtoken';
import User from '../models/user.js';

import { BadRequest, UnauthorisedRequest } from '../utils/errors';

const { JWT_SECRET } = process.env;

export default async (req, res, next) => {
    const header = req.headers.authorization;
    let token;

    if (header) token = header.split(` `)[1];
    try {
        if (token) {
            const decoded = await jwt.verify(token, JWT_SECRET);
            if (decoded) {
                req.body.userId = decoded._id;
                const user = (await User.findById(decoded._id))[0];

                if (user) {
                    console.log(user.admin);
                    const isAdmin = user.admin == 1 ? true : false;
                    if (!isAdmin) {
                        throw new UnauthorisedRequest(`User not authorised to perform this operation`);
                    }
                    next();
                } else {
                    throw new BadRequest(`User authorisation failed`);
                }
            }
        } else {
            throw new UnauthorisedRequest(`User not authenticated`);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};
