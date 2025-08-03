# Taskify
<!-- ABOUT THE PROJECT -->
## Description

Taskify is a full-stack web application built with NestJS, React, and TypeScript, designed to help users efficiently manage their daily tasks. It offers a clean, scalable architecture with error handling and a smooth user experience.

The application follows a mobile-first design, while still providing a responsive and user-friendly interface for larger screens. The project emphasizes software development best practices, including clean and maintainable code.

#### Project Overview
- Authentication using JWT
- Full CRUD for tasks with status-based filtering
- E2E tests for main user flows
- Dockerized environment for easy setup and deployment
- Clean, modular code structure following industry best practices

### Built With

#### Backend
* [Nest.js](https://nestjs.com)
* [PostgreSQL](https://www.postgresql.org)
* [TypeORM](https://typeorm.io)
* [JWT](https://github.com/nestjs/jwt)
* [Passport](https://docs.nestjs.com/recipes/passport)

#### Frontend
* [Vite](https://vite.dev/)
* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [TanstackQuery](https://tanstack.com/query/latest)
* [Shadcnui](https://ui.shadcn.com/)
* [React-Hook-Form](https://react-hook-form.com/)

### Features
- User registration and login with JWT
- Auth cookie with HttpOnly to prevent XSS
- Data validation on both backend and frontend
- Protected backend routes and frontend pages
- Full task CRUD (create, update, delete)
- Filter tasks by status (pending, completed, all)
- Dockerized infrastructure with docker-compose
- E2E tests with Cypress covering main flows

### E2E Tests

E2E tests are implemented using **Cypress** and cover all key scenarios, including:

- User registration
- User login
- Creating a task
- Marking task as completed
- Deleting task
- Filtering tasks by status
- Auth guard: private routes blocked without login
- Input validations (required fields, etc.)

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

4. Wait for postgres and backend services to be healthy and frontend to be started. Then you can access using `http://localhost:5173`
> ⚠️ **Warning**: Both Postgres and backend services have a 150-second timeout to become healthy. This should work fine in most environments, but if you run into issues with slow startups, just increase the timeout values in your docker-compose.yml or simply re-run the docker-compose up command — the database is likely to start up faster on subsequent runs

### Tests

1. Navigate to `frontend` folder inside project root.
2. Install requirements
```sh
npm install
```
3. Create `cypress.env.json` file for cypress inside frontend folder (there is a `cypress.env.json.example` to get you an idea of what is needed)
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
> ⚠️ **Warning**: Login credentials (admin@admin.com) are created during database seeding. To execute all tests you must provide an existing credential.

4. Run cypress 
```sh
# headless mode
npm run cy:run

# ui mode
npm run cy:open
```

<!-- ROADMAP -->
## Roadmap

- [ ] Implement [dark-mode](https://ui.shadcn.com/docs/dark-mode/vite)
- [ ] Add task list default filtering (maybe to always bring pending tasks first)
- [ ] Create unit tests for backend
- [ ] Implement logout feature (to switch users for now, you need to change URL to /login on your browser)
- [ ] Use docker to run E2E tests (maybe by using their official docker image)

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
