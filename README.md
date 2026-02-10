# Premium MERN Authentication System

A professional, high-performance full-stack authentication system built with the MERN stack. This project features a premium monochrome UI, secure JWT-based sessions, and a real-time OTP (One-Time Password) system integrated with Gmail for secure password resets.

## 🚀 Features

* **Premium Monochrome UI**: Elegant black and white design with smooth transitions and professional iconography.
* **Secure Authentication**: Full Login and Registration flow with password hashing using `bcryptjs`.
* **Gmail OTP Integration**: Secure "Forget Password" functionality using `Nodemailer` to send 6-digit codes directly to user's Gmail.
* **Dynamic User Dashboard**: Personalized greeting ("Hey User!") and a dynamic profile icon using the user's first initial.
* **Protected Routes**: Advanced frontend routing that prevents unauthorized access to the dashboard.
* **Database Management**: Integrated with MongoDB Atlas for scalable user data storage.

## 🛠️ Tech Stack

### Frontend
* **React.js (Vite)**: For a fast and modern user interface.
* **Lucide React**: High-quality vector icons for a premium feel.
* **React Router Dom**: For seamless single-page navigation.
* **Axios**: For communicating with the Backend API.

### Backend
* **Node.js & Express**: Scalable server-side logic.
* **MongoDB & Mongoose**: Flexible NoSQL database and object modeling.
* **JSON Web Tokens (JWT)**: For secure, stateless user sessions.
* **Nodemailer**: For automated email dispatching (Gmail SMTP).

## 📂 Project Structure

```text
CODECRAFT_FS_01/
├── Client/                # React Vite Frontend
│   ├── src/
│   │   ├── components/    # ProtectedRoute, UI Elements
│   │   ├── context/       # AuthContext for global state
│   │   ├── pages/         # Home, Auth, ForgotPassword, Dashboard
│   │   └── services/      # API communication logic
├── Server/                # Node.js Backend
│   ├── config/            # DB and Nodemailer configurations
│   ├── controllers/       # Business logic for Auth & OTP
│   ├── models/            # Mongoose User Schemas
│   └── routes/            # Express API Endpoints
└── .env                   # Environment Variables