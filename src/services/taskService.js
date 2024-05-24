// services/taskService.js
const Task = require('../models/Task');

const getTasks = async (userId) => {
    return await Task.find({ user: userId });
};

const createTask = async (userId, title, description) => {
    return await Task.create({user: userId, title, description});
};

const getTaskById = async(taskId, userId) => {
    const task = await Task.findById(taskId);

    if(task.user.toString() !== userId.toString()) {
        throw new Error('Not authorized');
    }
    return task;
}

const updateTask = async (taskId, userId, updates) => {
    const task = await Task.findById(taskId);
    if (task.user.toString() !== userId.toString()) {
        throw new Error('Not authorized');
    }
    task.title = updates.title || task.title;
    task.description = updates.description || task.description;
    task.completed = updates.completed !== undefined ? updates.completed : task.completed;
    return await task.save();
};

const deleteTask = async (taskId, userId) => {
    const task = await Task.findById(taskId);
    if (task.user.toString() !== userId.toString()) {
        throw new Error('Not authorized');
    }
    await task.remove();
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};