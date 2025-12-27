# TaskMaster Pro 🚀

A full-stack Goal Setting application built with the MERN stack, featuring advanced backend integrations for performance, scalability, and resilience. This project goes beyond basic CRUD by implementing **Redis caching**, **AWS S3 file storage**, and **Offline capabilities**.

## 🌟 Key Features

* **Authentication:** Secure user registration and login (JWT).
* **Database:** MongoDB for persistent storage of user goals.
* **Performance:** Redis caching implemented to reduce database load.
    * *Read Strategy:* Cache-aside pattern (Check Redis -> Fallback to Mongo).
    * *Write Strategy:* Cache invalidation on updates/deletes.
* **Cloud Storage:** AWS S3 integration for direct image uploads (Goal Vision Boards).
* **Offline First:** "Network-First, Fallback-to-Cache" strategy using LocalStorage to keep data visible even when WiFi is disconnected.
* **State Management:** Redux Toolkit for global frontend state.

---

## 🛠 Tech Stack

**Backend**
* **Node.js & Express:** API Runtime.
* **MongoDB & Mongoose:** NoSQL Database.
* **Redis:** In-memory data store for caching.
* **AWS S3 (via SDK v3):** Cloud object storage for images.

**Frontend**
* **React:** UI Library.
* **Redux Toolkit:** State management.
* **LocalStorage:** Client-side persistence for offline mode.

---

## ⚡ Prerequisites

Before running this project, ensure you have the following installed locally:
* [Node.js](https://nodejs.org/) (v14+)
* [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or via Atlas)
* [Redis](https://redis.io/) (Running locally)
* An [AWS Account](https://aws.amazon.com/) (For S3 Bucket)

---

## 🚀 Getting Started

### 1. Clone the Repository

git clone [https://github.com/Karma-tic/taskmaster-pro.git](https://github.com/Karma-tic/taskmaster-pro.git)
cd taskmaster-pro
2. Install Dependencies
Install dependencies for both the backend (root) and frontend.

Bash

# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
3. Environment Variables
Create a .env file in the root directory and add your configuration:

Code snippet

NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmaster
JWT_SECRET=your_super_secret_key

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1 or the server name given in S3 bucket
AWS_BUCKET_NAME=your_bucket_name
4. Run the Application
You need to run the Backend and Frontend concurrently.

Option A: Run separately (Recommended for debugging)

Bash

# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
cd frontend
npm start
Option B: Run together

Bash

# Root directory
npm run dev
The app will launch at http://localhost:3000 (or 3001 if 3000 is busy).
