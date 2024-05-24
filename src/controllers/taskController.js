// controllers/taskController.js
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
} = require('../services/taskService');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await getTasks(req.user._id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getTaskById = async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;

    try {
        const task = await getTaskById(id, _id);
        res.json(task);
    } catch (error) {
        res.status(404).json({message: 'Task not found'});
    }
};

exports.createTask = async (req, res) => {
    const {title, description} = req.body;

    try {
        const task = await createTask(req.user._id, title, description);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.updateTask = async (req, res) => {
    const {id} = req.params;
    const updates = req.body;

    try {
        const updatedTask = await updateTask(id, req.user._id, updates);
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.deleteTask = async (req, res) => {
    const {id} = req.params;

    try {
        await deleteTask(id, req.user._id);
        res.json({message: 'Task removed'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};