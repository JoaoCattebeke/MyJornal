import Relacionamento from "../../model/relacionamento";


export const relacionamentoRepository = {
    async findAll() {
        return Relacionamento.find();
    },
    async findById(id) {
        return Relacionamento.findById(id);
    },
    async create(data) {
        return Relacionamento.create(data);
    },
    async update(id, data) {
        return Relacionamento.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    },
    async delete(id) {
        return Relacionamento.findByIdAndDelete(id);
    },
};