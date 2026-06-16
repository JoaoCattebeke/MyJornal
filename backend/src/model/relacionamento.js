import mongoose from 'mongoose';


const { Schema, model } = mongoose;
const relacionamento = new Schema(
  {
    seguidor: { type: Object, required: true },
    seguindo: { type: Object, required: true },    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Relacionamento = model('Relacionamento', relacionamento);
export default Relacionamento;