# Real-time Chat Application

This is a real-time chat application built using **Socket.io**, **Node.js**, **Express.js**, and **Google Auth0** for authentication. The project utilizes **pnpm** as the package manager.

## Features

- **Real-time Communication**: Users can send and receive messages instantly using Socket.io.
- **Google Authentication**: Secure user authentication through Google Auth0.
- **Node.js & Express.js**: Backend server to handle requests and WebSocket connections.
- **pnpm**: Fast and efficient package management.

## Prerequisites

Make sure you have the following installed on your system:

- **pnpm**: Install pnpm globally if you don't have it already.
  ```bash
  npm install -g pnpm
  ```

## Installation 
- First install all the dependencies
  ```bash
  pnpm install
  ```
- Set up environment variables:
  ```bash
  PORT=3000
  AUTH0_CLIENT_ID=your-auth0-client-id
  AUTH0_CLIENT_SECRET=your-auth0-client-secret
  AUTH0_DOMAIN=your-auth0-domain
  ```
- Run the application:
  ```bash
  pnpm run dev
  ```

## Technologies Used
- Socket.io: WebSockets for real-time communication
- Node.js: Server-side JavaScript runtime
- Express.js: Fast and minimalist web framework for Node.js
- Google Auth0: Secure user authentication and authorization
- pnpm: Fast, disk space-efficient package manager

### Notes:
- Replace the placeholders for `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, and `AUTH0_DOMAIN` with your actual project details.
- This template can be further expanded based on additional details like testing, deployment, or additional usage notes.

  
