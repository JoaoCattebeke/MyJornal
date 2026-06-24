import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true,
      minlength: [2, 'Mínimo 2 caracteres'],
      maxlength: [200, 'Máximo 200 caracteres'],
    },
    description: {
      type: String,
      required: [true, 'Descrição é obrigatória'],
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    creationDate: {
      type: String,
      required: true,
    },
    creationTime: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Usuário de criação é obrigatório'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Post = mongoose.model('Post', postSchema);
