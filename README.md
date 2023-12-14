## Technical Challenge - Social Network?

Back-end application for social network.

### Deployment link

- Soon

### Technologies Used

For this project, the following technologies were used:

- Node (versão 18.16.0);
- Express
- Typescript
- Prisma
- Postgres
- Jest and Supertest

### How it Works

This project is a REST API for a regular social network. It has some entities:

For the `users` entity, two routes were created:

- POST `/signup`: Creates the user register.

- POST `/signin`: Creates a session to save the token for this user.


### How to Run and Configure for Development and Testing

1. Clone this repository.

2. Install all dependencies with the command:

```bash
npm i

```

3. Configure the .env and .env.test files using the .env.example file.

4. Execute all scripts to run migrations:

```bash
npm run dev:migration:run
```
```bash
npm run test:migration:run
```
```bash
npm run dev:migration:generate
```
```bash
npm run test:migration:generate
```

5. Run the backend in a development environment:

```bash
npm run dev
```

## How to Run Tests
1. After configuring the .env.test file using the .env.example file and running the database migration script for the test environment, use the following command in the terminal:

```bash
npm run test
```