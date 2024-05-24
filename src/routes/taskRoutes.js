const express = require('express');
const {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const auth = require('../middlewares/auth');
const { validateTask } = require('../validations/task');

const router = express.Router();

router.route('/')
    .get(auth, getTasks)
    .post(auth, validateTask, createTask);

router.route('/:id')
    .get(auth, getTaskById)
    .put(auth, validateTask, updateTask)
    .delete(auth, deleteTask);

module.exports = router;