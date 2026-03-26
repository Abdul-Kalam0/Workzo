
# 🚀 Workzo – Task Management & Team Collaboration Tool (MERN Stack)

**Workzo** is a production-ready **task management and team collaboration platform** built using the **MERN stack**.  
It enables teams to manage projects, assign tasks, track progress, and generate productivity reports through a secure and scalable REST API.

This project demonstrates **real-world backend architecture**, **JWT authentication**, **query-based filtering**, and **analytics reporting**, making it ideal for **recruiters and ATS screening**.

---

## 🌐 Live Application

- **Frontend:** https://workzo-ak-001.vercel.app/
- **Backend API:** https://workzo-backend-001.vercel.app/

---

## 🔑 Demo Credentials

```
Email: abdul@gmail.com
Password: 12345678
```

---

## ✨ Key Features

- JWT Authentication & Authorization  
- RESTful API Design  
- MVC Architecture  
- Role-based Task Assignment  
- URL-based Query Filtering  
- MongoDB Aggregation Reports  
- Secure Cookie Handling  
- Scalable Backend Architecture  
- Production Deployment on Vercel  

---

## 🧠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS

### Frontend
- React
- Context API
- Axios
- React Router
- Bootstrap

---

## 📂 API Endpoints with Examples

### 🔐 Authentication

#### Signup
**POST** `/auth/signup`

Request:
```json
{
  "name": "Abdul",
  "email": "abdul@gmail.com",
  "password": "12345678"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

#### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "abdul@gmail.com",
  "password": "12345678"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "userId",
    "email": "abdul@gmail.com"
  }
}
```

---

## 📁 Projects

#### Create Project
**POST** `/projects`

Request:
```json
{
  "name": "Workzo Backend",
  "description": "Backend development tasks"
}
```

Response:
```json
{
  "success": true,
  "project": {
    "_id": "projectId",
    "name": "Workzo Backend"
  }
}
```

---

## ✅ Tasks

#### Create Task
**POST** `/tasks`

Request:
```json
{
  "title": "Implement Auth",
  "status": "In Progress",
  "deadline": "2026-01-30",
  "project": "projectId",
  "assignedTo": "userId",
  "tags": ["backend", "auth"]
}
```

Response:
```json
{
  "success": true,
  "task": {
    "_id": "taskId",
    "title": "Implement Auth",
    "status": "In Progress"
  }
}
```

---

#### Get Tasks (Query Filtering)
**GET** `/tasks?status=Completed&assignedTo=userId`

Response:
```json
{
  "success": true,
  "count": 3,
  "tasks": []
}
```

---

## 👥 Teams

#### Create Team
**POST** `/teams`

Request:
```json
{
  "name": "Backend Team"
}
```

Response:
```json
{
  "success": true,
  "team": {
    "_id": "teamId",
    "name": "Backend Team"
  }
}
```

---

## 🏷️ Tags

#### Create Tag
**POST** `/tags`

Request:
```json
{
  "name": "Urgent"
}
```

Response:
```json
{
  "success": true,
  "tag": {
    "_id": "tagId",
    "name": "Urgent"
  }
}
```

---

## 📊 Reports

#### Tasks Completed Last Week
**GET** `/report/last-week`

Response:
```json
{
  "success": true,
  "completedTasks": 8
}
```

---

#### Pending Tasks
**GET** `/report/pending`

Response:
```json
{
  "success": true,
  "pendingTasks": 12
}
```

---

## ⚙️ Environment Variables

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

---

## 🚀 Deployment

- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

---

## 👨‍💻 Author

**Abdul Kalam**  
Backend-Focused Full Stack Developer  

**Skills:**  
Node.js | Express.js | MongoDB | REST APIs | JWT | Google OAuth

---

## 📜 License

MIT License
