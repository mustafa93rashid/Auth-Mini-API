# Auth Mini API

A minimal Express.js and MongoDB authentication API built to practice Authentication, Authorization, JWT Cookies, Argon2 Password Hashing, Role-Based Access Control, Rate Limiting, XSS Protection, Express Validator, Refresh Tokens, and Account Lockout Protection.

---

## Features

* User Registration (Signup)
* User Login
* User Logout
* User Profile
* JWT Authentication
* HTTP-Only Cookie Authentication
* Access Token & Refresh Token Support
* Argon2 Password Hashing
* Role-Based Authorization (User / Admin)
* Protected Routes
* Account Lockout Protection
* Rate Limiting
* XSS Protection
* Express Validator
* Centralized Validation Handling

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Argon2
* Cookie Parser
* Express Validator
* Express Rate Limit
* Morgan
* XSS Clean

---

## Project Structure

```text
AUTH-MINI-API/
│
├── node_modules/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── protected.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── role.js
│   │   ├── limiter.js
│   │   ├── validate.js
│   │   ├── xss.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── protected.routes.js
│   │
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   ├── cookiesService.js
│   │   ├── jwtService.js
│   │   └── passwordService.js
│   │
│   └── Validation/
│       ├── authValidate.js
│       └── protectedValidation.js
│
├── app.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/auth-mini-api

JWT_SECRET_KEY=your_access_token_secret

REFRESH_JWT_SECRET_KEY=your_refresh_token_secret

NODE_ENV=development
```

---

## Installation

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run watch
```

---

## Authentication Routes

Base URL:

```text
/api/v1/auth
```

| Method | Route    | Description                                     |
| ------ | -------- | ----------------------------------------------- |
| POST   | /signup  | Register a new user                             |
| POST   | /login   | Login and receive authentication cookies        |
| put   | /refresh | Generate a new access token using refresh token  |
| POST   | /logout  | Clear authentication cookies                    |
| GET    | /profile | Return current authenticated user               |

---

Authentication Flow:

```text
Login
  ↓
Access Token Cookie
  ↓
GET /profile
  ↓
Auth Middleware
  ↓
Verify JWT
  ↓
Return Current User
```

--
## Protected Routes

Base URL:

```text
/api/v1
```

### User & Admin

```http
GET /api/v1/me/welcome

GET /api/v1/me/account-summary
```

### Admin Only

```http
GET /api/v1/admin/overview

GET /api/v1/admin/users

DELETE /api/v1/admin/users/:id
```

---

## Access Control Matrix

| Route                   | User  | Admin |
| ----------------------- | ----- | ----- |
| GET /me/welcome         | ✅ 200 | ✅ 200 |
| GET /me/account-summary | ✅ 200 | ✅ 200 |
| GET /admin/overview     | ❌ 403 | ✅ 200 |
| GET /admin/users        | ❌ 403 | ✅ 200 |
| DELETE /admin/users/:id | ❌ 403 | ✅ 200 |

---

## Testing with Postman

https://documenter.getpostman.com/view/45221006/2sBXwqtBW7



Login using an admin account and test the same routes.

Expected:

```http
200 OK
```

---

## Security Features

### Password Hashing

Passwords are hashed using Argon2 before being stored in MongoDB.

### JWT Authentication

Authentication uses JWT Access Tokens and Refresh Tokens.

### Cookie Authentication

Tokens are stored inside HTTP-Only Cookies.

### Role-Based Authorization

Admin routes require the `admin` role.

### Rate Limiting

Authentication routes are protected using Express Rate Limit.

Examples:

* Login requests are limited per IP.
* Signup requests are limited per IP.

### XSS Protection

Incoming requests are sanitized using XSS protection middleware.

### Request Validation

Validation is implemented using Express Validator.

Examples:

* Email validation
* Password length validation
* Name validation
* MongoDB ObjectId validation

### Account Lockout Protection

Failed login attempts are tracked.

When the maximum number of failed login attempts is reached:

* The account is temporarily blocked.
* Additional login attempts are denied.
* The account is automatically unlocked after the lock period expires.

This protection helps mitigate brute-force attacks.

---

## Author

Mustafa

Computer Engineer | MERN Stack Developer
