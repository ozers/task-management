const authService = require('../services/authService');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Mock User model and jwt
jest.mock('../models/User');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
    describe('register', () => {
        it('should create a user and return user data with token', async () => {
            const userData = { _id: '123', username: 'testuser', password: 'password123' };
            User.create.mockResolvedValue(userData);
            jwt.sign.mockReturnValue('fakeToken');

            const result = await authService.register('testuser', 'password123');

            expect(User.create).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
            expect(result).toEqual({
                _id: '123',
                username: 'testuser',
                token: 'fakeToken',
            });
        });

        it('should throw an error if user creation fails', async () => {
            User.create.mockRejectedValue(new Error('Database error'));

            await expect(authService.register('testuser', 'password123')).rejects.toThrow('Database error');
        });
    });

    describe('login', () => {
        it('should login a user and return user data with token if credentials are correct', async () => {
            const user = { _id: '123', username: 'testuser', matchPassword: jest.fn().mockResolvedValue(true) };
            User.findOne.mockResolvedValue(user);
            jwt.sign.mockReturnValue('fakeToken');

            const result = await authService.login('testuser', 'password123');

            expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
            expect(user.matchPassword).toHaveBeenCalledWith('password123');
            expect(result).toEqual({
                _id: '123',
                username: 'testuser',
                token: 'fakeToken',
            });
        });

        it('should throw an error if credentials are incorrect', async () => {
            const user = { _id: '123', username: 'testuser', matchPassword: jest.fn().mockResolvedValue(false) };
            User.findOne.mockResolvedValue(user);

            await expect(authService.login('testuser', 'wrongpassword')).rejects.toThrow('Invalid credentials');
        });

        it('should throw an error if user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            await expect(authService.login('unknownuser', 'password123')).rejects.toThrow('Invalid credentials');
        });
    });
});