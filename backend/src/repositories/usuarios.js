import Usuario from "../model/usuario.js";


export const userRepository = {
    async findAll() {
        return Usuario.find();
    },
    async findById(id) {
        return Usuario.findById(id);
    },
    async findByEmail(email) {
        return Usuario.findOne({ email }).select('+password');
    },
    async create(data) {
        return Usuario.create(data);
    },
    async update(id, data) {
        return Usuario.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    },
    async delete(id) {
        return Usuario.findByIdAndDelete(id);
    },
};