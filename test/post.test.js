const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

const connection = require('../src/database/connection');
const server = require('../server');

const createPostHelper = require('./helpers/createPostHelper');

chai.use(chaiHttp);

describe('Posts', () => {
  let primeiroPost;

  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();

    primeiroPost = await createPostHelper(
      'Edilson Silva',
      'um link bem legal',
      'um link massa'
    );
  });

  afterEach(async () => {
    await connection.migrate.rollback();
  });

  describe('Cria Post', () => {
    it('deve criar post', (done) => {
      let payload = {
        nomeUsuario: 'Rafael Henrique',
        avatar: 'algum link massa',
        urlImagemPublicacao: 'link da imagem publicada',
      };

      chai
        .request(server)
        .post('/api/v1/posts')
        .send(payload)
        .end((request, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.nomeUsuario).to.equal(payload.nomeUsuario);
          expect(response.body.avatar).to.equal(payload.avatar);
          expect(response.body.urlImagemPublicacao).to.equal(
            payload.urlImagemPublicacao
          );
          expect(response.body).has.property('dataPublicacao');
          done();
        });
    });
  });

  describe('Lists Posts', () => {
    it('deve listar posts', (done) => {
      chai
        .request(server)
        .get('/api/v1/posts')
        .end((request, response) => {
          expect(response.status).to.equal(200);
          expect(response.header).has.property('x-total-count');
          expect(response.body).to.be.an('array');
          expect(response.body[0].id).to.equal(primeiroPost.id);
          expect(response.body[0].nomeUsuario).to.equal(
            primeiroPost.nomeUsuario
          );
          expect(response.body[0].avatar).to.equal(primeiroPost.avatar);
          expect(response.body[0].urlImagemPublicacao).to.equal(
            primeiroPost.urlImagemPublicacao
          );
          expect(response.body[0]).has.property('dataPublicacao');
          done();
        });
    });
  });

  describe('Atualiza Post', () => {
    it('deve atualizar post', (done) => {
      const payload = {
        nomeUsuario: 'Maria Silva',
        avatar: 'algum link legal',
        urlImagemPublicacao: 'outro link legal',
      };

      chai
        .request(server)
        .put(`/api/v1/posts/${primeiroPost.id}`)
        .send(payload)
        .end((request, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.nomeUsuario).to.equal(payload.nomeUsuario);
          expect(response.body.avatar).to.equal(payload.avatar);
          expect(response.body.urlImagemPublicacao).to.equal(
            payload.urlImagemPublicacao
          );
          expect(response.body.dataPublicacao).to.equal(
            primeiroPost.dataPublicacao
          );
          done();
        });
    });
  });

  describe('Deleta Post', () => {
    it('deve deletar post', (done) => {
      chai
        .request(server)
        .delete(`/api/v1/posts/${primeiroPost.id}`)
        .end((request, response) => {
          expect(response.status).to.equal(204);
          done();
        });
    });
  });

  describe('Busca Post por ID', () => {
    it('deve buscar o post com o id fornecido', (done) => {
      chai
        .request(server)
        .get(`/api/v1/posts/${primeiroPost.id}`)
        .end((request, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
});
