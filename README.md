# 🧳 LFPortal - Lost & Found Reporting System

LFPortal is a web-based application that allows users to **report lost or found items** with detailed descriptions and images. It aims to connect people who have lost something with those who have found it.

The system supports secure user authentication, easy item reporting, and feedback/contact functionality — all built with modern web technologies. It's ideal for use in colleges, public institutions, or local communities.

This project is designed using the **MERN stack**

---

## ✨ Features

- 🔐 **User Authentication**: Secure signup and login using session-based authentication.
- 📝 **Lost & Found Reporting**: Users can submit reports for lost or found items, including images.
- 📂 **Cloud-based Image Upload**: Images are uploaded to Cloudinary for fast and scalable delivery.
- 📄 **Feedback & Support Forms**: Users can submit issues or suggestions directly through the portal.
- 🧭 **User Session Management**: Authenticated users stay logged in securely across the app.

---

## 🧰 Tech Stack Used

| Layer        | Technologies                             |
|--------------|-------------------------------------------|
| **Frontend** | React.js (with Vite), React Router, MUI   |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose    |
| **Auth**     | express-session, connect-mongo, bcrypt    |
| **Image Upload** | Cloudinary, multer-storage-cloudinary |

---

## 📦 Getting Started

Follow these 4 steps to set up and run LFPortal locally:

---

### 🔁 Step 1: Clone the Repository

git clone https://github.com/Mukundh15/LFPortal.git
cd LFPortal

---

### 🔁 Step 2: 

cd backend
npm install

🔐 Create .env file in /backend
PORT=8080
DBUrl=your_mongodb_connection_string
SESSION_SECRET=your_secure_session_secret
SALTROUNDS=10

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

---

### 🔁 Step 3:

cd ../frontend
npm install

---

### 🔁 Step 4:
run the both frontend and backend in each terminal
Terminal-1:
cd backend
npm start

Terminal-2:
cd frontend
npm run dev
