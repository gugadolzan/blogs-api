# Projeto API de Blogs

## Contexto

Este projeto trata-se de uma API de um CRUD posts de blog (com o Sequelize). São desenvolvidos endpoints (seguindo os princípios do REST) que estarão conectados ao seu banco de dados.

Existe uma tabela para os usuários que desejam se cadastrar na aplicação. Existe também uma tabela de Categorias de Posts e por fim a tabela de Posts, que guarda todas as informações dos posts realizados na plataforma.

## Tecnologias usadas

- Node.js
- Express.js
- MySQL
- Sequelize ORM

## Instalando dependências

```bash
npm install
```

## Executando aplicação

1. Certifique-se de que o MySQL server esteja rodando.

2. Altere o nome do arquivo `.env.example` para `.env` e adicione as informações de conexão com o banco de dados.

3. Execute o comando:

```bash
npm start
```
