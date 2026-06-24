import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import { User } from "../models/user.js";

const resolveUserId = (emailToId, email) => {
  const id = emailToId.get(email);
  if (!id) {
    console.warn(`[seed] Usuario com email ${email} nao encontrado no users.json.`);
  }
  return id;
};

/**
 * Carrega usuarios iniciais a partir de um arquivo JSON.
 * O JSON pode informar friends, solicitacao e aprovacao usando emails. Depois de
 * criar todos os usuarios, esta funcao converte esses emails para ObjectIds e
 * grava os relacionamentos respeitando a logica da aplicacao.
 */
export async function loadUser() {
  try {
    // Conta usuarios existentes para evitar cadastrar os mesmos dados toda vez
    // que o servidor iniciar.
    const existing = await User.countDocuments();
    if (existing > 10) {
      console.log("[seed] Users already exist - skipping seeding.");
      return;
    }

    // Monta o caminho absoluto do arquivo users.json, le o conteudo como texto
    // e converte esse texto JSON para um array de objetos JavaScript.
    const filePath = path.resolve(process.cwd(), "src", "init", "users.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(raw);

    // Cria todos os usuarios primeiro. Isso e importante porque os relacionamentos
    // precisam dos ObjectIds, e esses ids so existem depois que o MongoDB salva.
    const emailToId = new Map();
    for (const userData of users) {
      const hashed = await bcrypt.hash(userData.password, 10);
      const created = await userRepository.create({
        name: userData.name,
        email: userData.email,
        imagem: userData.imagem,
        password: hashed,
      });

      emailToId.set(userData.email, created._id.toString());
    }

    // Cria amizades ja aprovadas. Mesmo que o JSON declare a amizade em apenas
    // um usuario, a funcao grava nos dois lados para garantir que, se A e amigo
    // de B, B tambem e amigo de A.
    for (const userData of users) {
      const userId = resolveUserId(emailToId, userData.email);
      if (!userId) continue;

      for (const friendEmail of userData.friends || []) {
        const friendId = resolveUserId(emailToId, friendEmail);
        if (!friendId || userId === friendId) continue;

        await userRepository.addFriend(userId, friendId);
        await userRepository.addFriend(friendId, userId);
      }
    }

    // Cria pedidos enviados. Quem enviou guarda o outro usuario em solicitacao;
    // quem recebeu guarda o solicitante em aprovacao.
    for (const userData of users) {
      const userId = resolveUserId(emailToId, userData.email);
      if (!userId) continue;

      for (const requestedEmail of userData.solicitacao || []) {
        const requestedId = resolveUserId(emailToId, requestedEmail);
        if (!requestedId || userId === requestedId) continue;

        await userRepository.addSolicitacao(userId, requestedId);
        await userRepository.addAprovacao(requestedId, userId);
      }
    }

    // Tambem aceita pedidos declarados pelo lado de aprovacao. Isso deixa o JSON
    // flexivel: e possivel dizer "este usuario recebeu pedido de X" e o seed
    // cria automaticamente a solicitacao correspondente em X.
    for (const userData of users) {
      const userId = resolveUserId(emailToId, userData.email);
      if (!userId) continue;

      for (const requesterEmail of userData.aprovacao || []) {
        const requesterId = resolveUserId(emailToId, requesterEmail);
        if (!requesterId || userId === requesterId) continue;

        await userRepository.addAprovacao(userId, requesterId);
        await userRepository.addSolicitacao(requesterId, userId);
      }
    }

    console.log(`[seed] Created ${users.length} users with friends and pending requests`);
  } catch (err) {
    console.error("[seed] Error loading initial users:", err);
  }
}

/**
 * Apaga todos os usuarios do banco.
 * Esta funcao NAO e chamada automaticamente; use manualmente quando quiser
 * reiniciar a base de testes de usuarios.
 */
export async function zerarUsers() {
  await User.deleteMany({});
  console.log("[seed] Users removed from database");
}
