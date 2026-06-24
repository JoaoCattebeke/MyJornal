import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      minlength: [2, 'Mínimo 2 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    imagem: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
    friends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    solicitacao: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    aprovacao: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      // Executado quando o usuario vira JSON para resposta da API. Remove campos
      // sensiveis para que senha e refreshTokens nunca sejam enviados ao cliente.
      transform: (doc, ret) => {
        delete ret.refreshTokens;
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      // Faz a mesma protecao quando o documento e convertido para objeto comum
      // com toObject, nao apenas quando vira JSON.
      transform: (doc, ret) => {
        delete ret.refreshTokens;
        delete ret.password;
        return ret;
      },
    },
  }
);

// Metodo de instancia do usuario. Compara a senha digitada no login com o hash
// salvo no banco usando bcrypt, retornando true quando combinam e false quando nao.
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Metodo de instancia que adiciona um refresh token ao usuario e salva o documento.
// Isso permite manter controle de quais sessoes ainda podem renovar o login.
userSchema.methods.addRefreshToken = async function (token) {
  this.refreshTokens.push(token);
  return this.save();
};

// Metodo de instancia usado no logout de uma sessao. Ele filtra o array para
// remover apenas o token recebido e preserva os outros dispositivos logados.
userSchema.methods.removeRefreshToken = async function (token) {
  // O filter percorre todos os tokens salvos e monta um novo array contendo
  // apenas os tokens diferentes daquele que deve ser removido.
  this.refreshTokens = this.refreshTokens.filter((t) => t !== token);
  return this.save();
};

// Metodo de instancia usado no logout geral. Esvazia o array de refreshTokens,
// fazendo todas as sessoes do usuario perderem a capacidade de renovar acesso.
userSchema.methods.clearRefreshTokens = async function () {
  this.refreshTokens = [];
  return this.save();
};

export const User = mongoose.model('User', userSchema);
