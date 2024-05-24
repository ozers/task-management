const {register, login} = require("../services/authService");

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await register(username, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await login(username, password);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};