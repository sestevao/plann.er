# plann.er App API

Backend of Planner, a travel management application. Backend of Planner, a travel management application.

## Tools

- NodeJs
- Fastify
- Vitest
- Prisma
- Zod
- Typescript
- Dayjs
- Nodemailer
- Swagger

## Important learnings

- Creation of a REST API using Node and Fastify
- Creation of unit tests using Vitest
- Connection to sending emails using Nodemailer
- Connection to a database using Prisma
- Validations using Zod
- Applications of SOLID principles
- Creation of documentation with Swagger

## How to use

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sestevao/plann.er/server.git
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Launch the application:

```bash
npm run dev
```

The API will be available at http://localhost:3333.

#### Commands

```bash
# Open a tab to manipulate the database at http://localhost:5555
npx prisma studio
```

```bash
# Fill the database with fictitious data
npx prisma db seed
```

```bash
# Delete the current bank and redo the seed
npx prisma migrate reset
```

```bash
# Run unit tests
npm run test
```

```bash
# Generates the test coverage report
npm run coverage
```

```bash
# Run the application using Docker
docker compose up -d
```

#### REST API

The **client.http** file contains the calls to the endpoints, if you have the [REST Client extension installed](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

## Documentation

The documentation was generated with Swagger and can be found at http://localhost:3333/docs.
