<!-- PROJECT LOGO -->
<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
    <img src="https://legacy.reactjs.org/logo-og.png" width="120" alt="React Logo" />
  </a>
</p>
<p align="center">Scalable application to organize your routine into tasks</p> -->

# Taskify
<!-- ABOUT THE PROJECT -->
## Description

This is a fullstack web application built with **NestJS**, **React**, and **TypeScript** that allows users to organize their daily routine by managing tasks. This project provides a clean and scalable architecture for task management, with good error handling and a smooth user experience. It is designed to be **mobile** first but it has a good, friendly and responsive user interface. It tried to focus on some software development best practices just like preventing client side scripts by using HttpOnly cookie auth method, using jwt and passport on backend to protect endpoints, data validation in either back and frontend to prevent saving garbage on database and etc.

#### Features
- JWT authentication
- HttpOnly auth cookie to prevent client-side scripts
- Data validation on back and frontend
- Protected backend endpoints and frontend routes
- Login
- Register
- Task list with status filter
- Task management (create, update and delete)
- E2E tests with cypress
- Dockerized

### Built With

#### Backend
* [Nest.js](https://nestjs.com)
* [PostgreSQL](https://www.postgresql.org)
* [TypeORM](https://typeorm.io)
* [JWT](https://github.com/nestjs/jwt)
* [Passport](https://docs.nestjs.com/recipes/passport)

#### Frontend
* [Vite](https://vite.dev/)
* [React](https://docs.nestjs.com/recipes/passport)
* [Typescript](https://www.typescriptlang.org/)
* [TanstackQuery](https://tanstack.com/query/latest)
* [Shadcnui](https://ui.shadcn.com/)
* [Shadcnui](https://react-hook-form.com/)

<!-- GETTING STARTED -->
## Getting Started

The following instructions get you a local running copy of the application.

### Prerequisites

* [Docker](https://docs.docker.com/desktop/)

### Installation

1. Clone the repo
```sh
git clone git@github.com:viniciusromani/taskify.git
```
> ⚠️ **Warning**: If you get a `pgdata` folder inside project's root, you **must** delete it before moving to next steps.

2. Create `.env` file for backend and frontend (both have a `.env.example` to get you an idea of what is needed)

*suggested backend folder env file to run locally with docker*
```.sh
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=postgres
JWT_SECRET=6b20321e40b2c5f676f0c57f7204e937db015615650adefc5bf7bd9e03035559
JWT_EXPIRES_IN=12h
CORS_ALLOWED_ORIGIN=http://localhost:5173
```
*suggested frontend folder env file to run locally with docker*
```.sh
VITE_API_URL=http://localhost:3000
```

3. Run project on taskify root folder
```sh
docker compose -p taskify --env-file backend/.env up --build -d
```

### Tests

1. Create `.env` file for cypress inside frontend folder (there is a `cypress.env.json.example` to get you an idea of what is needed)
```sh
{
  "host": "http://localhost:5173",
  "backend": "http://localhost:3000",
  "login": {
    "email": "admin@admin.com",
    "password": "123"
  }
}
```
> ⚠️ **Warning**: Since you we are running E2E tests, this is going to log in using dockerized API so, provided credentials must be inserted on database. admin@admin user is created on seeding.

2. Run cypress wizard **OR** run e2e tests headless

`cypress wizard`
```sh
npm run cy:open
```

`headless`
```sh
npm run cy:run
```
> ⚠️ **Warning**: You dont need to be inside frontend folder to run tests


<!-- ROADMAP -->
## Roadmap

- [ ] Implement [dark-mode](https://ui.shadcn.com/docs/dark-mode/vite)
- [ ] Add task list default filtering (maybe to always bring pending tasks first)
- [ ] Create unit tests for backend

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

Vinicius Romani - vn.romani@gmail.com
