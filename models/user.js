import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from './db.js';

const { JWT_SECRET } = process.env;

// constructor
const User = function (user) {
    this.firstName = user.firstName;
    this.middleName = user.middleName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.mobile = user.mobile;
    this.passwordHash = user.passwordHash;
    this.admin = user.admin;
};

User.create = async (newUser) => {
    const user = await sql.query(`INSERT INTO user SET ?`, newUser);
    if (user) {
        const { email, mobile, firstname } = newUser;

        return { id: user.insertId, email, mobile, firstname };
    }
};

User.getAll = async () => {
    return await sql.query(`SELECT * FROM user`);
};

User.checkIfUserExists = async (user) => {
    return await sql.query(`SELECT * FROM user WHERE mobile = ${user.mobile} OR  email = '${user.email}'`);
};

User.findByEmail = async (email) => {
    return await sql.query(`SELECT * FROM user WHERE email = '${email}'`);
};

User.findById = async (id) => {
    return await sql.query(`SELECT * FROM user WHERE id = '${id}'`);
};

User.isValidEmail = (password, hash) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.compareSync(password, hash);
};

User.toJsonAuth = function toJsonAuth(user) {
    return {
        firstName: user.firstName,
        email: user.email,
        mobile: user.mobile,
        token: User.jwtGenerator(user)
    };
};

User.userObject = function userObject(user) {
    return {
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.admin == 1 ? true : false
    };
};

User.jwtGenerator = function (user) {
    return jwt.sign({ email: user.email, _id: user.id, mobile: user.mobile }, JWT_SECRET, { expiresIn: `1h` });
};

User.setPassword = function (password) {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
};

export default User;
