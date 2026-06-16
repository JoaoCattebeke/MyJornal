import mongoose from 'mongoose';


const { Schema, model } = mongoose;
const materia = new Schema(
  {
    titulo: { type: String, required: true },
    proprietario: { type: Object, required: true },
    conteudo: { type: String, required: true },
    imagem: { type: String, required: true }, //src
    tipo: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Materia = model('Materia', materia);
export default Materia;
