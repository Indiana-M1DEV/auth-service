# Indiana Authentication Microservice

## Overview
The Indiana Authentication Microservice is a dedicated component of the Indiana application, handling all aspects of authentication. This microservice ensures secure and efficient user authentication, integrating seamlessly with other services in the Indiana ecosystem.

## Features
- User login and registration
- Token generation and validation
- Password encryption and security checks

### AUTH Endpoints
All API endpoints are prefixed with `domain:port/auth/`:

| Method | Endpoint                 | Description                       |
|--------|--------------------------|-----------------------------------|
| POST   | `/register`              | Register a new user               |
| POST   | `/login`                 | Authenticate a user               |
| GET    | `/verify`                | Verify user account (local auth)  |
| GET    | `/validate/:token`       | Verify account with token         |
| GET    | `/google`                | Initiate Google authentication    |
| GET    | `/google/callback`       | Google auth callback              |
| GET    | `/google/failure`        | Handle Google auth failure        |

### ACCOUNT Endpoints
All API endpoints are prefixed with `domain:port/account/`:

| Method | Endpoint                | Description                      |
|--------|-------------------------|----------------------------------|
| GET    | `/profile/:userId`      | Get user account details         |
| GET    | `/stats/:userId`        | Get user account details         |
| GET    | `/nfts/:userId`         | Get user account details         |
| PUT    | `/addCache/:userId`     | Update user account details      |
| PUT    | `/organiseCache/:userId`| Update user account details      |
| PUT    | `/addNFT/:userId/:nftID`| Update user account details      |
| DELETE | `/delete`               | Delete user account              |

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
Configure the service by setting the environment variables from the `.env.example` file in the project root directory.

## Contributing
Contributions to the Indiana Authentication Microservice are welcome. Please ensure to follow the project's code style and contribution guidelines.

## License
This project is licensed under the [Unlicense](LICENSE).

## Contact
For any queries or contributions, please contact the project maintainers at [pierre.gineste@supdevinci-edu.fr].

---

© 2023 Indiana Project. All rights reserved.
