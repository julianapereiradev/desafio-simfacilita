# Projeto SIM Facilita - Backend

## 1. Seção Inicial
Este projeto consiste na implementação do desafio proposto pela SIM Facilita para criar uma plataforma de rede social simples. Você pode acessar o link do deploy do backend [aqui](https://desafio-sim-facilita.onrender.com).

## 2. Sobre
O backend apresenta funcionalidades-chave, incluindo cadastro, login, posts, comentários, seguir/deixar de seguir usuários, atualizar informações de perfil e exclusão de conta.

Bônus adicionado:
- Segurança: biblioteca bcrypt para que as senhas venham encriptadas;
- Segurança: Persistência do usuário por tokenização;

## 3. Tecnologias
- Node.js
- Typescript
- PrismaORM
- Cors
- Express
- Express-async-errors
- Postgres
- Http-status
- Joi
- Dotenv

## 4. Como Rodar
1. Clone o projeto
2. Instale as dependências com `npm i`
3. Crie os arquivos `.env` e `.env.test` na raiz do projeto, usando o `.env.example` como base e configurando o PostgreSQL
4. Execute os scripts para rodar as migrações:
   - `npm run dev:migration:run`
   - `npm run test:migration:run`
   - `npm run dev:migration:generate`
   - `npm run test:migration:generate`
5. Por fim, rode `npm run dev`
   - Para testes, utilize `npm run test`

## 5. Pontos de Melhorias Futuras
- Implementar testes de integração e unitários;
- Permitir exclusão de posts e comentários;
- Feed apenas com os posts da pessoa que você segue.

Espero que essas instruções sejam úteis. Em caso de dúvidas ou sugestões, sinta-se à vontade para entrar em contato.
