const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./src/config/database");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/auth', require('./src/routes/authRoutes'));

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json('hello world')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});