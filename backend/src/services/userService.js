import { userRepository } from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';
export const userService = {
    async getAllUsers() {
        return userRepository.findAll();
    },
    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
        throw new Error('Usuário não encontrado');
        }
        return user;
    },
    async createUser(data) {
        const exists = await userRepository.findByEmail(data.email);
        if (exists) {
            throw new Error('Email já cadastrado');
        }
        const hashed = await bcrypt.hash(data.password, 10);
        return userRepository.create({
            ...data,
            password: hashed,
        });
    },
};