const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const PostController = require('./controllers/PostController');

const routers = express.Router();

routers
  .route('/posts')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        nomeUsuario: Joi.string().required(),
        avatar: Joi.string()
          .required()
          .regex(
            /\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/
          )
          .message('O campo avatar deve estar no formato de URL'),
        urlImagemPublicacao: Joi.string()
          .required()
          .regex(
            /\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/
          )
          .message('O campo urlImagemPublicacao deve estar no formato URL'),
      }),
    }),
    PostController.create
  )
  .get(
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
      }),
    }),
    PostController.list
  );

routers
  .route('/posts/:id')
  .put(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        nomeUsuario: Joi.string(),
        avatar: Joi.string()
          .regex(
            /\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/
          )
          .message('O campo avatar deve estar no formato URL'),
        urlImagemPublicacao: Joi.string()
          .regex(
            /\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/
          )
          .message('O campo urlImagemPublicacao deve estar no formato URL'),
      }),
    }),
    PostController.update
  )
  .delete(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    PostController.delete
  )
  .get(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
    }),
    PostController.findById
  );

module.exports = routers;
