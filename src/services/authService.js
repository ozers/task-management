const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (username, password) => {
    const user = await User.create({ username, password });
    return {
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
    };
};

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
        return {
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid credentials');
    }
};

module.exports = {
    register,
    login,
};