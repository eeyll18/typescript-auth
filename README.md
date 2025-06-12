# Authentication & Authorization System (TypeScript Full-Stack)

This is a full-stack authentication and authorization system tailored for modern web applications.
It's built entirely with TypeScript, featuring a React frontend and a Node.js (Express.js) backend, with MongoDB as the database.

This endeavor is primarily a **personal development project** aimed at deepening my understanding and proficiency within the TypeScript ecosystem, practicing secure software development principles, and building an end-to-end solution using contemporary web technologies.

## Project Goals and Key Features

*   **Secure Authentication:** User registration, login, and JWT (JSON Web Token) based session management.
*   **Role-Based Authorization (RBAC):** Control access to different API endpoints and resources based on user roles (e.g., `user`, `admin`).
*   **Modern Tech Stack:** Leveraging TypeScript, React, Node.js, Express.js, and MongoDB.
*   **Security-Focused Development:** Implementation of security best practices such as password hashing (bcrypt), JWT security mechanisms, HttpOnly cookies for refresh tokens, CORS, and Helmet.
*   **Clean Code & File Structure:** Emphasis on a modular, understandable, and maintainable codebase with an organized file structure.

## Technologies Used

**Frontend (Client):**

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** For static typing, leading to more robust and maintainable code.
*   **React Router:** For client-side routing and navigation.
*   **Axios:** For making HTTP requests to the backend API.
*   **Context API**: For global state management.
*   **CSS / Tailwind CSS :** For styling.

**Backend (Server):**

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **TypeScript:** For static typing on the server-side.
*   **MongoDB:** NoSQL document database.
*   **Mongoose:** ODM (Object Data Modeling) library for MongoDB.
*   **JSON Web Tokens (JWT):** For implementing token-based authentication.
*   **Bcrypt.js:** For securely hashing passwords.
*   **Helmet:** To help secure Express apps by setting various HTTP headers.
*   **CORS:** To manage Cross-Origin Resource Sharing.
*   **Dotenv:** For managing environment variables.
*   **Cookie-parser:** For parsing cookie headers (especially for refresh tokens).

## Setup and Running

### Prerequisites

*   Node.js 
*   npm or yarn package manager
*   MongoDB instance (local or cloud-hosted, e.g., MongoDB Atlas)

    Clone the repository    :
    ```bash
    git clone https://github.com/eeyll18/typescript-auth.git
    ```

### Backend Setup

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Environment Variables:**
    Locate the `.env.example` file in the `server` directory. Copy it to a new file named `.env` and update it with your actual MongoDB URI, JWT secrets and etc.
    ```bash
    cp .env.example .env
    # Then edit .env with your configuration
    ```
    Example `.env` content:
    ```env
    PORT=
    MONGO_URI=
    JWT_SECRET=
    JWT_EXPIRES_IN=
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRES_IN=
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the server with `nodemon` (or `ts-node-dev`), automatically restarting on file changes.

5.  **For Production Build:**
    ```bash
    npm run build
    npm start
    # or
    yarn build
    yarn start
    ```

### Frontend Setup

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Environment Variables:**
    If you have a `.env.example` in the `client` directory, copy it to `.env` and configure the backend API URL.
    ```bash
    cp .env.example .env # If .env.example exists
    # Then edit .env
    ```
    Example `.env` content for a Vite project:
    ```env
    VITE_API_URL=
    ```

4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```

## API Endpoints (Examples)

### Auth Routes (`/api/auth`)

*   `POST /register`: Register a new user.
    *   Body: `{ "email": "user@example.com", "password": "password123", "roles": ["user"] }` (roles is optional, defaults to 'user')
*   `POST /login`: Log in an existing user.
    *   Body: `{ "email": "user@example.com", "password": "password123" }`
    *   Returns: Access token and user information. Sets refresh token as an HttpOnly cookie.
*   `POST /refresh-token`: Refresh an expired access token.
    *   Uses the refresh token from the HttpOnly cookie.
*   `POST /logout`: Log out the current user.
    *   Invalidates the refresh token and clears the cookie.

### Protected Routes (Example) (`/api/users`)

*   `GET /me`: Get the profile of the currently logged-in user (Requires Authentication).
*   `GET /admin-only`: An example endpoint accessible only by users with the 'admin' role.

## File Structure

The project follows a monorepo-like structure, with separate directories for the frontend (`client`) and backend (`server`) code.

## Future Roadmap & Learning Goals

As this is a personal development project, the plan is to continuously add new features and improve the existing structure, focusing on the following:

*   **Personal Development Goals:**
    *   Deepen TypeScript knowledge: Exploring more complex types, generics, advanced patterns, and utility types.
    *   Embrace Test-Driven Development (TDD): Writing comprehensive unit and integration tests using Jest, React Testing Library, and Supertest.
    *   Explore Microservices: Gaining a foundational understanding of microservice architectures and communication protocols like gRPC.

*   **Project Feature Enhancements:**
    *   **Password Reset Functionality:** Secure "Forgot Password" flow.
    *   **Two-Factor Authentication (2FA/MFA):** Adding an extra layer of security using TOTP.
    *   **Admin Dashboard:** A UI for managing users, roles, and permissions.
    *   **API Rate Limiting:** Protecting against brute-force and denial-of-service attacks.
    *   **And more...
---

## Contributing
Contributions, suggestions, and feedback are welcome.