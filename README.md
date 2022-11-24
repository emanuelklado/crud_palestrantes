
<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

   Uma aplicação de cadastro de talkers (palestrantes) em que é possível cadastrar, visualizar, pesquisar, editar e excluir informações.
   
   * Foi utilizado Node.js, Express, Docker e Swagger (documentação da API). Neste projeto ainda não foi utilizado banco de dados, os dados são armazenados em memória, assim como a arquiterura ainda não foi definida, visto que se tratou de meu primeiro contato com Node.js e Express.

   <strong>características:</strong>
  1. Uma API de um `CRUD` (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes (talkers) e;
  2. Endpoints que irão ler e escrever em um arquivo utilizando o módulo `fs`.
  3. Cada palestrante tem as seguintes informações:
    - `id` (gerado automaticamente);
    - `name` (nome da pessoa palestrante);
    - `age` (idade da pessoa palestrante);
    - `talk` (palestra que a pessoa irá ministrar);
    - `watchedAt` (data em que a palestra foi assistida);
    - `rate` (nota de 1 a 5 dada para a palestra).
    
</details>

# Orientações

<details>
  <summary><strong>‼️ Antes de começar a desenvolver</strong></summary><br />

  1. Clone o repositório

  - `git clone git@github.com:tryber/sd-020-b-project-talker-manager.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd sd-020-b-project-talker-manager`

  <summary><strong>:whale: Rodando no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker
 
  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `talker_manager`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it talker_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências com `npm install`
  > Rode no terminal interativo do container o comando `npm run dev` para iniciar o servidor.

  ## Sem Docker
  
  > Instale as dependências [**Caso existam**] com `npm install`

  :eyes: **De olho nas dicas:** 
  1. Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  2. O avaliador espera que a versão do `node` utilizada seja a 16.

  > Rode no terminal o comando `npm run dev` para iniciar o servidor.

</details>

<details>
 
  ### Executando todos os testes

  Para poder executar os testes, inicie sua aplicação com `npm run dev`, em seguida, basta executar o comando `npm test` e **todos** os seus testes serão executados.

  ### Executando um teste específico

  Para executar um teste expecífico, inicie sua aplicação com `npm run dev`, em seguida, basta executar o comando `npm test nome-do-teste`.

  Ex: Para executar o teste referente ao **login**, basta digitar `npm test login`.

  :warning: **Importante:** os comandos de testes podem ser executados tanto no terminal do seu computador quanto do **_Docker_**.
</details>


# Requisitos

## 1 - Crie o endpoint GET `/talker`

<details>
  <summary>A requisição deve retornar o <code>status 200</code> e um array com todas as pessoas palestrantes cadastradas.</summary><br />
</details>

<details>
  <summary>Caso não exista nenhuma pessoa palestrante cadastrada a requisição deve retornar o <code>status 200</code> e um array vazio.</summary><br />
</details>


## 2 - Crie o endpoint GET `/talker/:id`

<details>
  <summary>A requisição deve retornar o <code>status 200</code> e uma pessoa palestrante com base no <code>id</code> da rota.</summary><br />

</details>


<details>
  <summary>Caso não seja encontrada uma pessoa palestrante com base no <code>id</code> da rota, a requisição deve retornar o <code>status 404</code></summary><br />
  
</details>

## 3 - Crie o endpoint POST `/login`

O endpoint deverá receber no corpo da requisição os campos `email` e `password` e retornar um token aleatório de 16 caracteres. Este token será utilizado pelas requisições dos próximos requisitos do projeto.
  
<details>
  <summary>serão avaliados:</summary><br />
  
  - O endpoint deverá retornar um código de `status 200` com o token gerado e o seguinte corpo:

  ```json
  {
    "token": "7mqaVRXJSp886CGr"
  }
  ```

  - O endpoint deve retornar um token aleatório a cada vez que for acessado.
  
</details>


## 4 - Adicione as validações para o endpoint `/login`

Os campos recebidos pela requisição devem ser validados e, caso os valores sejam inválidos, o endpoint deve retornar o código de `status 400` com a respectiva mensagem de erro ao invés do token.

<details>
  <summary>As regras de validação são:</summary><br />

  - o campo `email` é obrigatório;
  - o campo `email` deve ter um email válido;
  - o campo `password` é obrigatório;
  - o campo `password` deve ter pelo menos 6 caracteres.

</details>
  
## 5 - Crie o endpoint POST `/talker`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

- O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;


- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

## 6 - Crie o endpoint PUT `/talker/:id`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.

</details>


## 7 - Crie o endpoint DELETE `/talker/:id`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

    - Caso o token não seja encontrado retorne um código de `status 401`;

    - Caso o token seja inválido retorne um código de `status 401`;

  - O endpoint deve deletar uma pessoa palestrante com base no id da rota. Devendo retornar o `status 204`, sem conteúdo na resposta.

</details>
  
## 8 - Crie o endpoint GET `/talker/search?q=searchTerm`

<details>
  <summary>Os seguintes pontos serão avaliados:</summary><br />

  - O endpoint deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL.

  - A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

    - Caso o token não seja encontrado retorne um código de `status 401`;

    - Caso o token seja inválido retorne um código de `status 401`;

  - Caso `searchTerm` não seja informado ou esteja vazio, o endpoint deverá retornar um array com todos as pessoas palestrantes cadastradas, assim como no endpoint GET `/talker`, com um `status 200`.

  - Caso nenhuma pessoa palestrante satisfaça a busca, o endpoint deve retornar o `status 200` e um array vazio.

</details>
