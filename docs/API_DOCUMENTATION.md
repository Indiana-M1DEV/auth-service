# API Documentation

## AUTH Endpoints
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

## ACCOUNT Endpoints
All API endpoints are prefixed with domain:port/account/:

| Method | Endpoint                 | Description                      |
|--------|-------------------------|----------------------------------|
| GET    | `/profile/:userId`      | Retrieve detailed profile information for the specified user |
| GET    | `/stats/:userId`        | Fetch statistics like caches found, caches organized, etc., for a specified user |
| GET    | `/nfts/:userId`         | List all NFTs owned by the specified user |
| PUT    | `/addCache/:userId`     | Record a new cache found by the user |
| PUT    | `/organiseCache/:userId`| Record a new cache organized by the user |
| PUT    | `/addNFT/:userId/:nftID`| Add a new NFT to the user's collection |
| DELETE | `/delete/:userId`       | Delete a specific user's account |

#### Example Request: GET `/profile/:userId`

### Response OK (200)
```json
{
	"username": "JohnDoe",
	"email": "johndoe@example.ex",
	"createdAt": "2020-01-01T00:00:01.000Z"
}
```
