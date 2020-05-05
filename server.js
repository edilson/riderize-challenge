const app = require('./src/config/custom-express');

const port = 3333;

module.exports = app.listen(port, () => {
  console.log(`Servidor escutando a porta ${port}`);
});
