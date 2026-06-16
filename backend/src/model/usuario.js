import mongoose from 'mongoose';


const { Schema, model } = mongoose;
const usuario = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Usuario = model('Usuario', usuario);
export default Usuario;