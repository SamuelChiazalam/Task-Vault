📝 TaskVault - Professional Todo Application
A full-stack todo management application built with Node.js, Express, MongoDB, and EJS. Features secure user authentication, task management with multiple states, and a modern, responsive UI.

🚀 Live Demo
Live Application:  https://render.com/docs/web-services#port-binding
✨ Features

🔐 Secure Authentication - User signup and login with bcrypt password hashing
✅ Task Management - Create, update, and delete todos with ease
🏷️ Task States - Organize tasks as pending, completed, or deleted
🔍 Smart Filtering - Filter tasks by status (All, Pending, Completed)
👤 User Isolation - Each user sees only their own tasks
🎨 Modern UI - Clean, responsive design with smooth animations
📱 Fully Responsive - Works seamlessly on desktop, tablet, and mobile
🔒 Session Management - Secure session handling with express-session
📊 Activity Logging - Comprehensive logging system for monitoring

🛠️ Tech Stack
Backend

Node.js - JavaScript runtime
Express.js - Web application framework
MongoDB - NoSQL database
Mongoose - MongoDB object modeling

Frontend

EJS - Embedded JavaScript templating
CSS3 - Modern styling with gradients and animations
Vanilla JavaScript - Client-side interactivity

Security & Authentication

bcryptjs - Password hashing
express-session - Session management
express-validator - Input validation

Development Tools

Nodemon - Auto-restart during development
Jest - Testing framework
dotenv - Environment variable management

📊 Database Schema (ERD)
Entity Relationship Diagram
ERD Link: https://drawsql.app/teams/samtech-3/diagrams/todoapp-erd
Users Table
Users
├── _id (ObjectId, Primary Key)
├── username (String, Unique, Required)
├── password_hash (String, Hashed, Required)
└── createdAt (DateTime)
Todos Table
Todos
├── user_id (ObjectId, Primary Key)
├── title (String, Required)
├── description (String)
├── status (Enum: 'pending' | 'completed' | 'deleted')
├── user (ObjectId, Foreign Key → users._id)
├── createdAt (DateTime)
└── updatedAt (DateTime)
Relationships

One-to-Many: One User can have many Todos
Foreign Key: todos.user references users._id

🚦 Getting Started
Prerequisites

Node.js (v14 or higher)
MongoDB Atlas account or local MongoDB installation
Git

Installation

Clone the repository

bashgit clone https://github.com/SamuelChiazalam/todo-app.git
cd todo-app

Install dependencies

bashnpm install

Create environment file

Create a .env file in the root directory:
envMONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp
SESSION_SECRET=your_super_secret_key_here
PORT=3000
NODE_ENV=development

Start the development server

bashnpm run dev

Open your browser

http://localhost:7000
📁 Project Structure
todo_app/
├── models/
│   ├── User.js              # User schema and authentication methods
│   └── Todo.js              # Todo schema with status management
├── routes/
│   ├── auth.js              # Authentication routes (signup, login, logout)
│   └── todos.js             # Todo CRUD operations
├── middleware/
│   └── auth.js              # Authentication middleware
├── views/
│   ├── login.ejs            # Login page
│   ├── signup.ejs           # Signup page
│   └── todos.ejs            # Main todos page
├── public/
│   └── styles.css           # Application styles
├── utils/
│   └── logger.js            # Logging utility
├── tests/
│   └── todo.test.js         # Unit tests
├── logs/
│   └── app.log              # Application logs
├── .env                     # Environment variables (not in repo)
├── .gitignore              # Git ignore rules
├── server.js               # Main application entry point
└── package.json            # Project dependencies
🔐 Security Features

Password Hashing: All passwords are hashed using bcrypt with salt rounds
Session Security: HTTP-only cookies prevent XSS attacks
Input Validation: Server-side validation prevents malicious input
MongoDB Injection Protection: Mongoose sanitizes queries
Environment Variables: Sensitive data stored securely
User Isolation: Middleware ensures users can only access their own data

🧪 Testing
Run the test suite:
bashnpm test
The application includes tests for:

Model validation
Authentication logic
Todo CRUD operations
Status transitions

📝 API Endpoints
Authentication Routes
MethodEndpointDescriptionGET/auth/loginDisplay login pagePOST/auth/loginAuthenticate userGET/auth/signupDisplay signup pagePOST/auth/signupCreate new userGET/auth/logoutLogout user
Todo Routes (Protected)
MethodEndpointDescriptionGET/todosGet all user todos (with optional filter)POST/todos/createCreate new todoPOST/todos/:id/statusUpdate todo statusPOST/todos/:id/deleteDelete todo (soft delete)
Query Parameters

/todos?filter=all - Show all todos
/todos?filter=pending - Show only pending todos
/todos?filter=completed - Show only completed todos

🎨 UI/UX Features

Glassmorphism Design: Modern frosted glass effect
Gradient Backgrounds: Beautiful color transitions
Smooth Animations: Fade-in effects and hover states
Responsive Layout: Mobile-first design approach
Loading States: Visual feedback for user actions
Empty States: Helpful messages when no todos exist

📈 Future Enhancements

 Todo categories/tags
 Due dates and reminders
 Search functionality
 Todo sharing between users
 Email notifications
 Dark mode toggle
 Drag-and-drop reordering
 Task priority levels
 Export todos to CSV/PDF

🚀 Deployment
Deploy to Render

Push to GitHub:

bashgit add .
git commit -m "Ready for deployment"
git push origin main

Create Render Web Service:

Connect your GitHub repository
Set build command: npm install
Set start command: npm start


Add Environment Variables:

MONGODB_URI
SESSION_SECRET
NODE_ENV=production


Deploy!

🐛 Troubleshooting
MongoDB Connection Issues

Ensure your IP is whitelisted in MongoDB Atlas (add 0.0.0.0/0 for all IPs)
Check your connection string format
Verify database user credentials

Session Issues

Clear browser cookies
Check SESSION_SECRET is set in environment variables
Verify session middleware is configured correctly

Build Failures

Delete node_modules and package-lock.json, then run npm install
Check Node.js version compatibility
Verify all dependencies are in package.json

👨‍💻 Author
Samuel Chiazalam Ugbo
GitHub: @YOUR_USERNAME
Email: samuelzalam@gmail.com

📄 License
This project is open source and available under the MIT License.
🙏 Acknowledgments

MongoDB Atlas for free database hosting
Render for free application hosting
The Node.js and Express.js communities
DrawSQL for ERD creation tools


⭐ If you found this project helpful, please give it a star!
📧 Questions or feedback? Feel free to open an issue or reach out!
🚀 Happy Task Managing!
