# Task Management API

This project is a RESTful API for a simple task management application. It includes user authentication and authorization features, allowing users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

## Technologies Used

- Node.js
- Express.js
- JWT (JSON Web Tokens)
- MongoDB (Mongoose)
- Jest (for unit testing)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/ozers/task-management.git
    cd task-management
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Configure environment variables:**

   Create a `.env` file in the root of the project with the following content:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/taskmanagement
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the services using Docker Compose:**

    ```sh
    docker-compose up --build
    ```

## Using the API

- APIs will be available on localhost:3000

Here are the endpoints available:

### Authentication
- `POST api/auth/register`: Register user.
- `POST api/auth/login`: Login with user credentials, get JWT token.

### Tasks
- `GET /api/tasks/`: Get all tasks, authenticated user can only access their tasks.
- `POST /api/tasks/`: Create a new task, authenticated user can only create tasks for themselves.
- `GET /api/tasks/:id`: Get a task by ID, authenticated user can only access their tasks.
- `PUT /api/tasks/:id`: Update a task by ID, authenticated user can only update their tasks.
- `DELETE /api/tasks/:id`: Delete a task by ID, authenticated user can only delete their tasks.

## Contact

For support or queries, reach out to [ozersubasi.dev@gmail.com](mailto:ozersubasi.dev@gmail.com)
