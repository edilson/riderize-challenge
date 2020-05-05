const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { nomeUsuario, avatar, urlImagemPublicacao } = request.body;

    const id = uuidv4();
    const dataPublicacao = moment().toISOString();

    await connection('post').insert({
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

    const [count] = await connection('post').count();

    const posts = await connection('post')
      .select('*')
      .limit(20)
      .offset((page - 1) * 20);

    response.header('X-Total-Count', count['count']);

    return response.json(posts);
  },
  async update(request, response) {
    const { id } = request.params;

    await connection('post').where('id', id).update(request.body);

    const updatedPost = await connection('post')
      .where('id', id)
      .select('*')
      .first();

    return response.json(updatedPost);
  },
  async delete(request, response) {
    const { id } = request.params;

    await connection('post').where('id', id).delete();

    return response.status(204).send();
  },
  async findById(request, response) {
    const { id } = request.params;

    const post = await connection('post').where('id', id).select('*').first();

    return response.json(post);
  },
};
