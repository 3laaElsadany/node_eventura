# Eventura Project using nodejs and MongoDB

Node Eventura is a Node.js application designed to manage events, users, and related functionalities. It provides a platform to create, update, and view events, with user authentication and other essential features.

## Features

- User authentication (sign-up, login).
- Event creation, management, and viewing.
- Easy API for interacting with events.
- Secure and efficient event management workflows.
- RESTful API.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed (v14 or above recommended)
- MongoDB database to store event and user data.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/3laaElsadany/node_eventura.git
    ```

2. Navigate to the project folder:

    ```bash
    cd node_eventura
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root of the project and add your database URL, API keys, and other necessary configurations.

    Example:

    ```env
    MONGO_URI=mongodb://localhost:27017/eventura
    JWT_SECRET=your-jwt-secret-key
    ```

5. Run the application:

    ```bash
    npm start
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Users

- **POST `/users/signup`** - Register a new user.
- **POST `/users/login`** - User login.
  
### Events

- **GET `/events`** - Get all events.
- **POST `/events`** - Create a new event (authentication required).
- **PUT `/events/:id`** - Update event details (authentication required).
- **DELETE `/events/:id`** - Delete an event (authentication required).
