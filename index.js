const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./src/config/database");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();
connectDB();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 30, // limit each IP to 30 requests per windowMs
});

const app = express();

app.use(express.json());
app.use(limiter);

app.use(helmet());
app.use(helmet.xssFilter());


app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json('hello world')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});