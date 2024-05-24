const express = require('express');
const connectDB = require("./src/config/database");

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json('hello world')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});