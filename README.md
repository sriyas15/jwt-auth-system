# 🔐 JWT Authentication System (Node.js + Express + MongoDB)

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/JWT-Authentication-blue)
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-orange)

A **secure authentication system** built using **Node.js, Express.js, MongoDB, JWT, and bcrypt**.  
This project implements **Access Token + Refresh Token authentication**, **protected routes**, and **secure cookie handling**.

---

# 🚀 Features

✔ User Registration with **hashed passwords**  
✔ Secure Login Authentication  
✔ **JWT Access Token** (short-lived)  
✔ **Refresh Token** stored in **HTTP-only cookies**  
✔ **Protected routes using middleware**  
✔ **Token refresh mechanism**  
✔ **Logout functionality**  
✔ **Async error handling middleware**  
✔ **Database seeder for testing**

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Backend runtime |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcrypt** | Password hashing |

---

# 🔐 Authentication Flow

1. **User Registration**
   - User provides email and password.
   - Password is **hashed using bcrypt** before storing in MongoDB.

2. **User Login**
   - Server verifies credentials.
   - Generates:
     - **Access Token (15 minutes)**
     - **Refresh Token (30 days)**

3. **Access Token Usage**
   - Sent in request header:
   ```
   Authorization: Bearer <accessToken>
   ```

4. **Protected Routes**
   - Middleware verifies the **JWT Access Token**.

5. **Token Refresh**
   - When the access token expires, a **new access token** is generated using the **refresh token stored in cookies**.

6. **Logout**
   - Refresh token cookie is **cleared from the client**.

---

# 📂 Project Structure

```
backend
│
├── src
│   ├── config
│   │    └── db.js
│   │
│   ├── controllers
│   │
│   ├── middleware
│   │    ├── asyncHandler.js
│   │    └── authMiddleware.js
│   │
│   ├── model
│   │    └── userSchema.js
│   │
│   ├── routes
│   │    └── userRoutes.js
│   │
│   └── data
│        └── users.js
    |___utils
         |__ generateTokens.js
│
├── .env
├── server.js
├── seeder.js
└── package.json
```

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sriyas15/jwt-auth-system.git
```

### 2️⃣ Navigate to Project Folder


### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Create `.env` File

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

### 5️⃣ Run the Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

# 🧪 API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| POST | `/api/user/register` | Register new user |
| POST | `/api/user/login` | Login user |
| GET | `/api/user/logout` | Logout user |
| GET | `/api/user/profile` | Protected user profile |

---

# 🔑 Protected Route Testing (Postman)

When testing **protected routes**, you must include the **Access Token** in headers.

Example:

```
Authorization: Bearer <accessToken>
```

Without this header, the server returns:

```
401 Unauthorized
```

---

# 🌱 Database Seeder

Seeder helps **populate sample users** for development and testing.

Sample data is located in:

```
backend/src/data/users.js
```

### Import Seed Data

```bash
node seeder.js
```

### Delete Seed Data

```bash
node seeder.js -d
```

---

# ✅ Testing

All endpoints were tested using **Postman** to verify:

- User Registration
- Login Authentication
- JWT Token Generation
- Route Protection
- Token Refresh
- Logout Functionality

---

# 📌 Key Security Practices

- Password hashing using **bcrypt**
- **Short-lived access tokens**
- **HTTP-only cookies** for refresh tokens
- **JWT verification middleware**
- Centralized **async error handling**

---

# 👨‍💻 Author

**Mohamed Riyas S**