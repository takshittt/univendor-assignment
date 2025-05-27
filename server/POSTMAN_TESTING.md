# Testing ShopEase API with Postman

This guide will help you test all the authentication endpoints using Postman.

## Prerequisites

1. **Postman installed** - Download from [postman.com](https://www.postman.com/downloads/)
2. **Server running** - Make sure your server is running on `http://localhost:5000`
3. **MongoDB running** - Ensure MongoDB is running locally or you have a valid MongoDB URI

## Server Setup

Before testing, make sure your server is running:

```bash
cd server
npm start
```

You should see:

```
Connected to MongoDB
Server is running on port 5000
```

## Base URL

All requests will use the base URL: `http://localhost:5000`

## Testing Endpoints

### 1. Test Server Health

**Method:** `GET`  
**URL:** `http://localhost:5000/`  
**Headers:** None required

**Expected Response:**

```json
{
  "message": "ShopEase API Server is running!"
}
```

---

### 2. User Registration (Sign Up)

**Method:** `POST`  
**URL:** `http://localhost:5000/api/auth/signup`  
**Headers:**

- `Content-Type: application/json`

**Body (raw JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

**Expected Response (201 Created):**

```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673d4a5e8f1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-12-01T10:30:00.000Z"
  }
}
```

**Save the token** from this response - you'll need it for protected routes!

---

### 3. User Login (Sign In)

**Method:** `POST`  
**URL:** `http://localhost:5000/api/auth/signin`  
**Headers:**

- `Content-Type: application/json`

**Body (raw JSON):**

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Expected Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673d4a5e8f1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-12-01T10:30:00.000Z"
  }
}
```

---

### 4. Get Current User Profile

**Method:** `GET`  
**URL:** `http://localhost:5000/api/auth/me`  
**Headers:**

- `Authorization: Bearer YOUR_JWT_TOKEN_HERE`

**Body:** None

**Expected Response (200 OK):**

```json
{
  "user": {
    "id": "673d4a5e8f1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-12-01T10:30:00.000Z"
  }
}
```

---

### 5. Update User Profile

**Method:** `PUT`  
**URL:** `http://localhost:5000/api/auth/profile`  
**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer YOUR_JWT_TOKEN_HERE`

**Body (raw JSON):**

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Expected Response (200 OK):**

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "673d4a5e8f1234567890abcd",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "createdAt": "2023-12-01T10:30:00.000Z"
  }
}
```

---

### 6. Sign Out

**Method:** `POST`  
**URL:** `http://localhost:5000/api/auth/signout`  
**Headers:**

- `Authorization: Bearer YOUR_JWT_TOKEN_HERE`

**Body:** None

**Expected Response (200 OK):**

```json
{
  "message": "Signed out successfully"
}
```

---

## Step-by-Step Postman Setup

### Setting Up Your Environment

1. **Create a new Collection:**

   - Open Postman
   - Click "New" → "Collection"
   - Name it "ShopEase API"

2. **Create Environment Variables:**
   - Click the gear icon (⚙️) in the top right
   - Click "Add" to create a new environment
   - Name it "ShopEase Local"
   - Add these variables:
     - `baseUrl`: `http://localhost:5000`
     - `token`: (leave empty for now)

### Creating Requests

1. **Add requests to your collection:**

   - Right-click your collection → "Add Request"
   - Name each request appropriately

2. **Use environment variables:**
   - Instead of `http://localhost:5000`, use `{{baseUrl}}`
   - For Authorization headers, use `Bearer {{token}}`

### Automating Token Management

**Add this script to your Sign Up and Sign In requests:**

1. Go to the "Tests" tab in your request
2. Add this JavaScript code:

```javascript
// Parse the response
const responseJson = pm.response.json();

// Save the token to environment variable
if (responseJson.token) {
  pm.environment.set("token", responseJson.token);
  console.log("Token saved:", responseJson.token);
}

// Test for successful response
pm.test("Status code is 200 or 201", function () {
  pm.expect([200, 201]).to.include(pm.response.code);
});

pm.test("Response has token", function () {
  pm.expect(responseJson).to.have.property("token");
});

pm.test("Response has user data", function () {
  pm.expect(responseJson).to.have.property("user");
});
```

This will automatically save the JWT token to your environment variable for use in protected routes.

---

## Common Error Responses

### 400 Bad Request

```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized

```json
{
  "message": "No token, authorization denied"
}
```

### 500 Internal Server Error

```json
{
  "message": "Server error during registration"
}
```

---

## Testing Workflow

1. **Start with Health Check** - Test `GET /`
2. **Register a new user** - Test `POST /api/auth/signup`
3. **Login with the user** - Test `POST /api/auth/signin`
4. **Get user profile** - Test `GET /api/auth/me`
5. **Update profile** - Test `PUT /api/auth/profile`
6. **Sign out** - Test `POST /api/auth/signout`

---

## Tips for Effective Testing

1. **Use different email addresses** for multiple user registrations
2. **Test edge cases:** empty fields, invalid emails, mismatched passwords
3. **Test without tokens** on protected routes to verify authentication
4. **Check response times** and status codes
5. **Use the Collection Runner** to run all tests in sequence

---

## Postman Collection Export

You can also import this as a Postman collection. Create a file called `ShopEase-API.postman_collection.json`:

```json
{
  "info": {
    "name": "ShopEase API",
    "description": "Authentication API for ShopEase",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/",
          "host": ["{{baseUrl}}"],
          "path": [""]
        }
      }
    },
    {
      "name": "Sign Up",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"Password123\",\n  \"confirmPassword\": \"Password123\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/signup",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "signup"]
        }
      }
    },
    {
      "name": "Sign In",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"Password123\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/signin",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "signin"]
        }
      }
    },
    {
      "name": "Get Profile",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/auth/me",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "me"]
        }
      }
    },
    {
      "name": "Update Profile",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Smith\",\n  \"email\": \"johnsmith@example.com\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/auth/profile",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "profile"]
        }
      }
    },
    {
      "name": "Sign Out",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/auth/signout",
          "host": ["{{baseUrl}}"],
          "path": ["api", "auth", "signout"]
        }
      }
    }
  ]
}
```

To import this:

1. Open Postman
2. Click "Import"
3. Drag and drop the JSON file or paste the content
4. Set up your environment variables as described above

Happy testing! 🚀
