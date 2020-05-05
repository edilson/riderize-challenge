const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const connection = require('../database/connection');

const POST_TABLE = 'post';
const LIMIT_PER_PAGE = 20;

module.exports = {
  async create(request, response) {
    const { nomeUsuario, avatar, urlImagemPublicacao } = request.body;

    const id = uuidv4();
    const dataPublicacao = moment().toISOString();

    await connection(POST_TABLE).insert({
      id,
      nomeUsuario,
      avatar,
      dataPublicacao,
      urlImagemPublicacao,
    });

    return response
      .status(201)
      .json({ nomeUsuario, avatar, dataPublicacao, urlImagemPublicacao });
  },
  async list(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection(POST_TABLE).count();

    const posts = await connection(POST_TABLE)
      .select('*')
      .limit(LIMIT_PER_PAGE)
      .offset((page - 1) * LIMIT_PER_PAGE);

    response.header('X-Total-Count', count['count']);

    return response.json(posts);
  },
  async update(request, response) {
    const { id } = request.params;

    await connection(POST_TABLE).where('id', id).update(request.body);

    const updatedPost = await connection(POST_TABLE)
      .where('id', id)
      .select('*')
      .first();

    return response.json(updatedPost);
  },
  async delete(request, response) {
    const { id } = request.params;

    await connection(POST_TABLE).where('id', id).delete();

    return response.status(204).send();
  },
  async findById(request, response) {
    const { id } = request.params;

    const post = await connection(POST_TABLE)
      .where('id', id)
      .select('*')
      .first();

    return response.json(post);
  },
};
