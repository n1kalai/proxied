# Proxied

This project integrates Apollo Client for auth, state management, GraphQL queries. The application includes a cart system with cache management and real-time updates. It also features a comprehensive testing setup using Jest and React Testing Library to ensure application reliability. Additionally, Zod is used for schema validation to maintain data integrity.

## Installation

```sh
git clone https://github.com/n1kalai/proxied.git
cd proxied
npm install
```

## Running the Project

```sh
npm run dev
```

## Running Tests

```sh
npm run test
```

## Token for tests 🪙

I have declared constat **token** at the very beginning of each test file, if tests are not passed, please provide real token instead of mine. for me it works for now ..

---

#### Project works without problems with:

##### Node v20.10.0

##### NPM v10.2.3

---

proxied/
│── tests / # Test files
│── src/components/ # Reusable React components
│── src/pages/ # Next.js pages
│── src/graphql/ # GraphQL queries, mutations and subscriptions
│── src/hooks/ # Custom hooks
│── src/context/ # for context file of user
│── src/types/ # For typescript types
│── jest.config.ts # Jest configuration

## Contact

If you have any questions, please reach out via email: **nikoloz.palagashvili@gmail.com**
