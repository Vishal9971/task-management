Task Management API – Backend Developer Assignment
📖 Overview

This project is a RESTful Task Management System API built using Node.js, Express, MongoDB, and JWT authentication.
It supports user authentication, role-based access control (RBAC), task CRUD operations, task assignment, analytics, real-time updates, and rate limiting.

The API is documented using OpenAPI (Swagger) for easy exploration and testing.

🛠️ Tech Stack

1. Node.js – Runtime environment
2. Express.js – Web framework
3. MongoDB + Mongoose – Database & ORM
4. JWT – Authentication
5. Socket.IO – Real-time updates
6. Swagger – API documentation
7. express-rate-limit – API rate limiting

⚙️ Setup Instructions (Local Development)

1️⃣ Prerequisites
Make sure you have installed:
1. Node.js (v16+ recommended)
2. MongoDB (local or MongoDB Atlas)
3. Git
4. Check versions:
    a. node -v
    b. npm -v
2️⃣ Clone the Repository
    1. git clone https://github.com/Vishal9971/task-management-api.git
    2. cd task-management-api
3️⃣ Install Dependencies
    1. npm install
4️⃣ Environment Variables Configuration
    ~ Create a .env file in the root directory:
     1. PORT=3001
     2. MONGO_URI=mongodb://localhost:27017/task_management
     3. JWT_SECRET=your_jwt_secret_key
⚠️ Note: .env is ignored using .gitignore for security reasons.
5️⃣ Start the Server
    1. npm start
Expected output:
    ~ Server running on port 3001
    ~ MongoDB Connected

🔐 Authentication Flow
    1. Register → Create a user with role
    2. Login → Receive JWT token
    3. Pass token → Authorization header
    4. Access protected routes
  Header format:
    ~ Authorization: Bearer <JWT_TOKEN>

👥 Roles & Permissions
     1. Admin	Full access (users, tasks, analytics)
     2. Manager	Assign tasks, manage team tasks
     3. User	Manage own tasks & profile
  ~ Roles are stored as string values:
     ~  "ADMIN" | "MANAGER" | "USER"

📌 API Overview
🔑 Auth Routes
~ Method	Endpoint	Description
~ POST	/api/auth/register	Register new user
~ POST	/api/auth/login	Login user
~ POST	/api/auth/logout	Logout user

~ Example (Register):
{
  "username": "vishal",
  "email": "vishal@example.com",
  "password": "StrongPass@123",
  "role": "ADMIN"
}

👤 User Routes
~ Method	Endpoint	Description
~ GET	/api/users/profile	Get logged-in user profile
 

📋 Task Routes
~ Method	Endpoint	Description
~ POST	/api/tasks	Create task
~ GET	/api/tasks	Get tasks (filter & search)
~ GET	/api/tasks/:id	Get task by ID
~ PUT	/api/tasks/:id	Update task
~ DELETE	/api/tasks/:id	Delete task

~ Task Fields:
{
  "title": "Fix API bug",
  "description": "Fix rate limiter issue",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-01-20"
}

📌 Task Assignment
~ Method	Endpoint	Description
~ PUT	/api/tasks/:id/assign	Assign task to user

~ Only Admin / Manager can assign tasks.

📊 Analytics Routes
~ Method	Endpoint	Description
~ GET	/api/analytics/tasks	"COMPLETED" / "PENDING" / "OVERDUE"

~ Example response:
{
  "completed": 5,
  "pending": 3,
  "overdue": 2
}

🔄 Real-Time Updates (Socket.IO)

~ Users receive live notifications when:
    1. Task is created
    2. Task is updated
    3. Task is assigned
~ Backend emits events:
    ~ io.to(userId).emit("taskUpdated", task);

🚦 Rate Limiting

~ Rate limits based on endpoint sensitivity:

~ Endpoint	Limit
  1. Login	5 requests / 15 mins
  2. General API	100 requests / 15 mins
  3. Admin APIs	300 requests / 15 mins
  
~ Implemented using express-rate-limit.

🔍 Search & Filtering

~ Tasks can be filtered using query params:
  ~ GET /api/tasks?status=completed&priority=high

~ Supported filters:
  1. status
  2. priority
  3. dueDate
  4. search (title/description)

📘 API Documentation (Swagger)

~ Swagger UI available at:
  ~ http://localhost:3001/api-docs

~ Includes:
  1. Request/response schemas
  2. Authentication requirements
  3. Query parameters
  4. Example payloads


✅ Conclusion

~ This project demonstrates:
  1. Secure authentication
  2. Role-based access control
  3. Clean API architecture
  Real-time communication
  Scalable backend design
