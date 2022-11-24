const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const swaggerUi = require('swagger-ui-express');
const routes = require('./Router/talkerRouter');
const { errorMiddleware } = require('./Middleware');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./docs/swagger.json')));

app.use(errorMiddleware);

app.use('/talker', rescue(routes.talkerRouter));
app.use('/login', rescue(routes.loginRouter));

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send(
    `<h1>'Olá, seja bem vindo ao CRUD de palestrantes!'</h1>
    <br>
    <h2>Para acessar a documentação da API, acesse: <a href="http://localhost:3000/api-docs">
    http://localhost:3000/api-docs</a></h2>
    <br>
    <h2>Ou siga o passo a passo no README do projeto ;)</h2>
    `,
  );
});

app.listen(PORT, () => {
  console.log(`Executando em http://localhost:${PORT}`);
});
