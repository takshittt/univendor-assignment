# ShopEase Server

A simple Express.js server with authentication for the ShopEase e-commerce application.

## Features

- User registration and authentication
- JWT-based authorization
- Password hashing with bcrypt
- MongoDB integration with Mongoose
- CORS enabled for frontend integration
- Input validation and error handling

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment variables:
   Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/shopease

# JWT Secret (change this to a random string in production)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Client URL for CORS
CLIENT_URL=http://localhost:5173
```

3. Start MongoDB:
   Make sure MongoDB is running on your system.

4. Start the server:

For development (with auto-restart):

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### POST /api/auth/signup

Register a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**

```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-12-01T00:00:00.000Z"
  }
}
```

#### POST /api/auth/signin

Authenticate a user.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-12-01T00:00:00.000Z"
  }
}
```

#### POST /api/auth/signout

Sign out a user (protected route).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
  "message": "Signed out successfully"
}
```

#### GET /api/auth/me

Get current user information (protected route).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-12-01T00:00:00.000Z"
  }
}
```

#### PUT /api/auth/profile

Update user profile (protected route).

**Headers:**

```
Authorization: Bearer jwt_token_here
```

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response:**

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "createdAt": "2023-12-01T00:00:00.000Z"
  }
}
```

## User Model

The User model has the following fields:

- `name`: String (required, 2-50 characters)
- `email`: String (required, unique, valid email format)
- `password`: String (required, minimum 6 characters, automatically hashed)
- `createdAt`: Date (automatically generated)
- `updatedAt`: Date (automatically updated)

## Security Features

- Passwords are hashed using bcrypt with a cost factor of 12
- JWT tokens expire after 7 days
- Input validation and sanitization
- CORS protection
- Password field is automatically excluded from JSON responses

## Error Handling

The server includes comprehensive error handling for:

- Validation errors
- Duplicate email registration
- Invalid credentials
- Missing authentication tokens
- Server errors

## Development

For development, the server uses nodemon for automatic restarts when files change:

```bash
npm run dev
```

## Testing

You can test the API endpoints using tools like Postman, curl, or any HTTP client.

Example using curl:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","confirmPassword":"password123"}'

# Sign in
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```
