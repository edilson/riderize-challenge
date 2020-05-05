const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const connection = require('../../src/database/connection');

module.exports = async (username, imagemUsuario, linkImagemPublicacao) => {
  const post = {
    nomeUsuario: username,
    avatar: imagemUsuario,
    urlImagemPublicacao: linkImagemPublicacao,
  };

  const id = uuidv4();
  const dataPublicacao = moment().toISOString();

  let { nomeUsuario, avatar, urlImagemPublicacao } = post;

  await connection('post').insert({
    id,
    nomeUsuario,
    avatar,
    dataPublicacao,
    urlImagemPublicacao,
  });

  const createdPost = await connection('post')
    .where('id', id)
    .select('*')
    .first();

  return createdPost;
};
