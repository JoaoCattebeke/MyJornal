import fs from "fs/promises";
import path from "path";
import { postRepository } from "../repositories/postRepository.js";
import { Post } from "../models/post.js";
import { User } from "../models/user.js";

/**
 * Carrega posts iniciais a partir de um arquivo JSON e atribui cada post a um
 * usuario aleatorio ja existente. Deve rodar depois de loadUser, porque precisa
 * de usuarios cadastrados para preencher o campo createdBy.
 */
export async function loadPosts() {
  try {
    // Evita duplicar posts caso o servidor reinicie com o banco ja populado.
    const existing = await Post.countDocuments();
    if (existing > 10) {
      console.log("[seed] Posts already exist – skipping seeding.");
      return;
    }

    // Busca apenas os _ids dos usuarios existentes. Como o objetivo e escolher
    // autores aleatorios, nao precisamos carregar nome, email ou outros campos.
    const users = await User.find({}, "_id");
    if (users.length === 0) {
      console.log("[seed] No users found – skipping post seeding.");
      return;
    }
    // Transforma a lista de documentos em uma lista simples de ids para facilitar
    // o sorteio de um autor para cada post.
    const userIds = users.map((u) => u._id);

    // Le o arquivo posts.json e transforma o conteudo em objetos JavaScript.
    const filePath = path.resolve(process.cwd(), "src", "init", "posts.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(raw);

    // Para cada post do JSON, sorteia um usuario e salva o post com esse usuario
    // no campo createdBy, simulando publicacoes de pessoas diferentes.
    for (const p of posts) {
      const randomUser = userIds[Math.floor(Math.random() * userIds.length)];
      await postRepository.create({
        title: p.title,
        description: p.description,
        isPublic: p.isPublic,
        creationDate: p.creationDate,
        creationTime: p.creationTime,
        createdBy: randomUser,
      });
    }

    console.log(`[seed] Created ${posts.length} posts with random users`);
  } catch (err) {
    console.error("[seed] Error loading initial posts:", err);
  }
}

/**
 * Apaga todos os posts do banco.
 * Esta funcao NAO e chamada automaticamente; use manualmente quando quiser
 * reiniciar a base de testes de posts.
 */
export async function zerarPosts() {
  await Post.deleteMany({});
  console.log("[seed] Posts removed from database");
}
