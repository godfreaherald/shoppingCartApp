import User from '../models/user.js';
import { BadRequest } from '../utils/errors';

exports.create = async (req, res, next) => {
    try {
        const existingUser = await User.checkIfUserExists(req.body);

        if (existingUser.length) {
            res.status(400).json({
                message: `User exists with same email or mobile`
            });
        } else {
            console.log(req.body);
            let user = new User({
                email: req.body.email,
                mobile: req.body.mobile,
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                admin: req.body.admin || 0
            });
            user.passwordHash = await User.setPassword(req.body.password);

            // Save User in the database
            const userData = await User.create(user);
            if (userData) {
                res.status(201).json(userData);
            }
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = (await User.findByEmail(email))[0];

        if (user) {
            const isValid = await User.isValidEmail(password, user.passwordHash);
            if (isValid) {
                res.status(200).json({
                    message: `Login Success!`,
                    user: User.toJsonAuth(user)
                });
            } else {
                throw new BadRequest(`Invalid Password!`);
            }
        } else {
            throw new BadRequest(`Invalid Credentials!`);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const users = await User.getAll();
        if (users) {
            const data = users.map((user) => {
                return User.userObject(user);
            });
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.findOne = async (req, res) => {
    try {
        const user = (await User.findByEmail(req.params.email))[0];
        if (user) {
            const data = User.userObject(user);
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};
