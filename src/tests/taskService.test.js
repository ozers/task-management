const taskService = require('../services/taskService');
const Task = require('../models/Task');

jest.mock('../models/Task');

describe('TaskService', () => {
    describe('getTasks', () => {
        it('should return tasks for the user', async () => {
            const tasks = [{ title: 'Test Task', description: 'Description', user: '123' }];
            Task.find.mockResolvedValue(tasks);

            const result = await taskService.getTasks('123');

            expect(Task.find).toHaveBeenCalledWith({ user: '123' });
            expect(result).toEqual(tasks);
        });
    });

    describe('createTask', () => {
        it('should create and return a new task', async () => {
            const taskData = { title: 'New Task', description: 'New Description', user: '123' };
            Task.create.mockResolvedValue(taskData);

            const result = await taskService.createTask('123', 'New Task', 'New Description');

            expect(Task.create).toHaveBeenCalledWith({ user: '123', title: 'New Task', description: 'New Description' });
            expect(result).toEqual(taskData);
        });
    });

    describe('getTaskById', () => {
        it('should return the task if user is authorized', async () => {
            const task = { _id: '1', title: 'Test Task', description: 'Description', user: '123' };
            Task.findById.mockResolvedValue(task);

            const result = await taskService.getTaskById('1', '123');

            expect(Task.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(task);
        });

        it('should throw an error if user is not authorized', async () => {
            const task = { _id: '1', title: 'Test Task', description: 'Description', user: '124' };
            Task.findById.mockResolvedValue(task);

            await expect(taskService.getTaskById('1', '123')).rejects.toThrow('Not authorized');
        });
    });

    describe('updateTask', () => {
        it('should update and return the task if user is authorized', async () => {
            const task = { _id: '1', title: 'Old Title', description: 'Old Description', user: '123', save: jest.fn().mockResolvedValue(true) };
            Task.findById.mockResolvedValue(task);

            const updates = { title: 'New Title', description: 'New Description' };
            const result = await taskService.updateTask('1', '123', updates);

            expect(Task.findById).toHaveBeenCalledWith('1');
            expect(task.save).toHaveBeenCalled();
            expect(result).toEqual(true);
        });

        it('should throw an error if user is not authorized', async () => {
            const task = { _id: '1', title: 'Old Title', description: 'Old Description', user: '124' };
            Task.findById.mockResolvedValue(task);

            await expect(taskService.updateTask('1', '123', { title: 'New Title' })).rejects.toThrow('Not authorized');
        });
    });

    describe('deleteTask', () => {
        it('should delete the task if user is authorized', async () => {
            const task = { _id: '1', title: 'Test Task', description: 'Description', user: '123', remove: jest.fn().mockResolvedValue(true) };
            Task.findById.mockResolvedValue(task);

            await taskService.deleteTask('1', '123');

            expect(Task.findById).toHaveBeenCalledWith('1');
            expect(task.remove).toHaveBeenCalled();
        });

        it('should throw an error if user is not authorized', async () => {
            const task = { _id: '1', title: 'Test Task', description: 'Description', user: '124' };
            Task.findById.mockResolvedValue(task);

            await expect(taskService.deleteTask('1', '123')).rejects.toThrow('Not authorized');
        });
    });
});