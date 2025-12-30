# Mini User Management System

A comprehensive Full-Stack MERN application featuring secure authentication, role-based access control, and modern dark-themed UI.

---

## 1. Project Overview & Purpose

This is a Full-Stack MERN (MongoDB, Express, React, Node) application built to demonstrate a secure user management workflow. The project provides a complete solution for:

- **Authentication System**: Secure user registration, login, and password reset functionality with JWT-based sessions
- **Role-Based Access Control (RBAC)**: Distinct permissions for standard Users and Admins with protected routes
- **Profile Management**: Users can securely update their personal information and passwords
- **Administrative Dashboard**: Centralized admin panel to view all users and manage account statuses (activate/deactivate)
- **Password Recovery**: Complete forgot password flow with email verification and secure password reset
- **Modern UI/UX**: Dark-themed interface inspired by Vercel's design system with responsive layouts

---

## 2. Tech Stack Used

### Frontend

- **Framework**: React 18 with Vite (Fast build tool)
- **Styling**: Tailwind CSS v4 (Utility-first CSS framework)
- **UI Components**: Custom components with Lucide React Icons
- **HTTP Client**: Axios for API communication
- **Routing**: React Router DOM v6
- **State Management**: React Context API for authentication
- **Notifications**: React Hot Toast for user feedback

### Backend

- **Runtime**: Node.js (Express.js framework)
- **Database**: MongoDB Atlas (Cloud NoSQL database)
- **Authentication**: JSON Web Tokens (JWT) for stateless sessions
- **Security**:
  - Bcrypt.js for password hashing (cost factor: 12)
  - CORS enabled for cross-origin requests
  - Environment variable protection with dotenv
- **Validation**: Validator.js for email validation
- **API Architecture**: RESTful API design

---

## 3. Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` root folder with the required environment variables (see section 4 below)

4. Start the development server:
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Verify the API base URL in `src/api/axios.js` points to your backend:

   ```javascript
   baseURL: "http://localhost:5000/api";
   ```

4. Start the React application:

   ```bash
   npm run dev
   ```

5. Open your browser to: `http://localhost:5173`

---

## 4. Environment Variables

Create a `.env` file in the `/backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secure_random_secret_key
JWT_EXPIRES_IN=90d
NODE_ENV=development
```

**Variable Descriptions:**

- `PORT`: Server port number (default: 5000)
- `MONGO_URI`: MongoDB connection string (get from MongoDB Atlas)
- `JWT_SECRET`: Secret key for signing JWT tokens (use a long random string)
- `JWT_EXPIRES_IN`: Token expiration time (e.g., 90d, 7d, 24h)
- `NODE_ENV`: Environment mode (development/production)

---

## 5. Deployment Instructions

### Backend Deployment (Render/Railway/Heroku)

1. **Prepare for deployment:**

   - Ensure `package.json` has a start script: `"start": "node server.js"`
   - Add `"engines"` field specifying Node version

2. **Environment Setup:**

   - Set all environment variables in your hosting platform
   - Update `MONGO_URI` to production database
   - Generate a strong `JWT_SECRET` for production

3. **Deploy:**
   - Connect your Git repository
   - Select the `backend` folder as root directory
   - Deploy and note the backend URL

### Frontend Deployment (Vercel/Netlify)

1. **Update API URL:**

   - Change `baseURL` in `src/api/axios.js` to your deployed backend URL:

   ```javascript
   baseURL: "https://your-backend-url.com/api";
   ```

2. **Build the project:**

   ```bash
   npm run build
   ```

3. **Deploy:**

   - Connect your Git repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Deploy to Vercel/Netlify

4. **Environment Variables (if needed):**
   - `VITE_API_URL`: Backend API URL (if using env variables)

---

## 6. API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. User Signup

**Endpoint:** `POST /users/signup`

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "676c8f9e8a1234567890abcd",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2025-12-30T10:30:00.000Z"
    }
  }
}
```

---

#### 2. User Login

**Endpoint:** `POST /users/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "676c8f9e8a1234567890abcd",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2025-12-30T11:00:00.000Z"
    }
  }
}
```

**Error Response (401 Unauthorized):**

```json
{
  "status": "fail",
  "message": "Incorrect email or password"
}
```

---

#### 3. Forgot Password - Verify Email

**Endpoint:** `POST /users/forgot-password`

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "message": "Email verified. You can now reset your password."
}
```

**Error Response (404 Not Found):**

```json
{
  "status": "fail",
  "message": "No user found with that email"
}
```

---

#### 4. Reset Password

**Endpoint:** `POST /users/reset-password`

**Request Body:**

```json
{
  "email": "john@example.com",
  "newPassword": "newPassword123"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "message": "Password reset successfully!"
}
```

---

### Protected Endpoints (Require JWT Token)

**Authorization Header:**

```
Authorization: Bearer <your_jwt_token>
```

#### 5. Get Current User Profile

**Endpoint:** `GET /users/me`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "676c8f9e8a1234567890abcd",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2025-12-30T10:30:00.000Z"
    }
  }
}
```

---

#### 6. Update Own Profile

**Endpoint:** `PATCH /users/updateMe`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "fullName": "John Smith",
  "password": "newPassword123"
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "676c8f9e8a1234567890abcd",
      "fullName": "John Smith",
      "email": "john@example.com",
      "role": "user",
      "status": "active"
    }
  }
}
```

---

### Admin-Only Endpoints (Require Admin Role)

#### 7. Get All Users (Admin)

**Endpoint:** `GET /users`

**Query Parameters (Optional):**

- `page`: Page number (default: 1)
- `limit`: Users per page (default: 10)

**Headers:**

```
Authorization: Bearer <admin_jwt_token>
```

**Response (200 OK):**

```json
{
  "status": "success",
  "results": 2,
  "total": 2,
  "data": {
    "users": [
      {
        "_id": "676c8f9e8a1234567890abcd",
        "fullName": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "status": "active",
        "createdAt": "2025-12-30T10:30:00.000Z"
      },
      {
        "_id": "676c8f9e8a1234567890abce",
        "fullName": "Admin User",
        "email": "admin@example.com",
        "role": "admin",
        "status": "active",
        "createdAt": "2025-12-29T09:00:00.000Z"
      }
    ]
  }
}
```

---

#### 8. Update User Status (Admin)

**Endpoint:** `PATCH /users/:id`

**Headers:**

```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**

```json
{
  "active": false
}
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "676c8f9e8a1234567890abcd",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "inactive"
    }
  }
}
```

---

## Error Responses

### Common Error Codes

| Status Code | Description                             |
| ----------- | --------------------------------------- |
| 400         | Bad Request - Invalid input data        |
| 401         | Unauthorized - Invalid or missing token |
| 403         | Forbidden - Insufficient permissions    |
| 404         | Not Found - Resource doesn't exist      |
| 500         | Internal Server Error                   |

**Example Error Response:**

```json
{
  "status": "fail",
  "message": "You do not have permission to perform this action"
}
```

---

## Features Implemented

### User Features

- ✅ User registration with email validation
- ✅ Secure login with JWT authentication
- ✅ Password recovery (Forgot Password flow)
- ✅ Profile management (update name and password)
- ✅ Protected routes requiring authentication
- ✅ Responsive dark-themed UI

### Admin Features

- ✅ View all registered users
- ✅ Activate/Deactivate user accounts
- ✅ Pagination support for user listings
- ✅ Role-based access control
- ✅ Protected admin-only routes

### Security Features

- ✅ Password hashing with bcrypt (cost: 12)
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variable protection

---

## Project Structure

```
mini-user-system/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── authUtils.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Testing the Application

### Create Admin User (MongoDB)

To create an admin user, manually update a user document in MongoDB:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

### Test Admin Routes

1. Login as admin user
2. Copy the JWT token from response
3. Use token in Authorization header for admin endpoints

---

## Postman Collection

Import the following endpoints into Postman for easy API testing:

**Collection Variables:**

- `base_url`: `http://localhost:5000/api`
- `token`: `<your_jwt_token_here>`

Use `{{base_url}}` and `{{token}}` in your requests for dynamic testing.

---

## Future Enhancements

- [ ] Email service integration for password reset
- [ ] Refresh token implementation
- [ ] User profile image upload
- [ ] Activity logs and audit trails
- [ ] Rate limiting for API endpoints
- [ ] Password strength requirements
- [ ] Two-factor authentication (2FA)
- [ ] Social authentication (Google, GitHub)

---

## License

This project is open-source and available for educational purposes.

---

## Author

Created as a demonstration of Full-Stack MERN development with modern security practices and UI/UX design.

---

## Support

For issues or questions, please create an issue in the repository or contact the development team.
