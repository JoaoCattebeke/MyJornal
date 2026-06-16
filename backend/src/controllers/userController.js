import { userService } from '../services/userService.js';
export const userController = {
    async getAll(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    },
    async getById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    },
    async create(req, res, next) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    },
};