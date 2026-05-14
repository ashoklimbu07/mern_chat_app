# MerChat — Full-Stack Real-Time Chat App

A real-time chat application built with the MERN stack and Socket.IO.

## Tech Stack

| Layer    | Technology                            |
| -------- | ------------------------------------- |
| Backend  | Node.js, Express 5, MongoDB, Mongoose |
| Auth     | JWT (jsonwebtoken), bcryptjs          |
| Realtime | Socket.IO                             |
| Frontend | React 19, Vite, Tailwind CSS v4       |
| Routing  | React Router v7                       |

---

## Project Structure

```
mer_chat_app_palmind/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Route handlers (auth, user, message)
│   ├── middlewares/    # JWT auth middleware
│   ├── models/         # Mongoose schemas (User, Message)
│   ├── routes/         # Express routers
│   ├── socket/         # Socket.IO setup
│   ├── .env.example    # Environment variable template
│   └── index.js        # Entry point
└── frontend/
    ├── public/
    └── src/
        ├── components/ # Reusable UI components
        ├── screens/    # Page-level components
        ├── socket.js   # Socket.IO client
        └── App.jsx     # Routes
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mer_chat_app_palmind
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
PORT=3000
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
```

Start the backend:

```bash
npm start
```

The server runs at `http://localhost:3000`.

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. API requests are proxied to the backend automatically via Vite config.

---

## API Endpoints

### Auth

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | /api/auth/signup | Register a user    |
| POST   | /api/auth/login  | Login, returns JWT |

### Users

| Method | Endpoint         | Auth | Description                         |
| ------ | ---------------- | ---- | ----------------------------------- |
| GET    | /api/users       | ✅   | List all users (except self)        |
| GET    | /api/users/stats | ✅   | Total user count & message count    |
| GET    | /api/users/:id   | ❌   | Get user by ID                      |
| PUT    | /api/users/:id   | ✅   | Update own profile (email/password) |
| DELETE | /api/users/:id   | ✅   | Delete own account                  |

### Messages

| Method | Endpoint              | Auth | Description              |
| ------ | --------------------- | ---- | ------------------------ |
| GET    | /api/messages/:userId | ✅   | Get conversation history |
| POST   | /api/messages/:userId | ✅   | Send a message           |

---

## Socket.IO Events

| Event            | Direction         | Payload                                     | Description                                |
| ---------------- | ----------------- | ------------------------------------------- | ------------------------------------------ |
| `onlineUsers`    | Server → All      | `string[]` (array of user IDs)              | Broadcast when a user connects/disconnects |
| `receiveMessage` | Server → Receiver | `{ senderId, receiverId, text, createdAt }` | Delivered to receiver in real-time         |

---

## Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication and route protection
- Full user CRUD with authorization (users can only modify their own account)
- Real-time messaging via Socket.IO
- Chat history persisted in MongoDB
- Online/offline presence indicators
- Total user and message count stats endpoint
