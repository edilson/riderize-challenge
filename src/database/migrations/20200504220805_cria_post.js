exports.up = function (knex) {
  return knex.schema.createTable('post', (table) => {
    table.string('id').primary();
    table.string('nomeUsuario').notNullable();
    table.string('avatar').notNullable();
    table.date('dataPublicacao').notNullable();
    table.string('urlImagemPublicacao').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('post');
};
