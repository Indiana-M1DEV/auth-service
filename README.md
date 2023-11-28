# Indiana Authentication Microservice

## Overview
The Indiana Authentication Microservice is a dedicated component of the Indiana application, handling all aspects of authentication. This microservice ensures secure and efficient user authentication, integrating seamlessly with other services in the Indiana ecosystem.

## Features
- User login and registration
- Token generation and validation
- Password encryption and security checks

## API Endpoints
All API endpoints are prefixed with `domain:port/auth/`:

### AUTH Endpoints

- `POST /register`: Register a new user
- `POST /login`: Authenticate a user
- `POST /logout`: Log out a user
- `GET /token/refresh`: Refresh authentication token
- `POST /password/reset`: Initiate password reset
- `POST /password/change`: Change user password
- `GET /account/verify`: Verify user account
- `GET /account/verify/resend`: Resend account verification email

### ACCOUNT Endpoints

- `GET /account`: Get user account details
- `PUT /account`: Update user account details
- `DELETE /account`: Delete user account

## Getting Started

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed.
- A running instance of [MongoDB](https://www.mongodb.com/) for the database.

### Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd auth-service`
3. Install dependencies: `npm install`
4. Start the service: `npm start`

### Configuration
Configure the service by setting the environment variables in a `.env.example` file in the project root directory.

## Contributing
Contributions to the Indiana Authentication Microservice are welcome. Please ensure to follow the project's code style and contribution guidelines.

## License
This project is licensed under the [Unlicense](LICENSE).

## Contact
For any queries or contributions, please contact the project maintainers at [pierre.gineste@supdevinci-edu.fr].

---

© 2023 Indiana Project. All rights reserved.
