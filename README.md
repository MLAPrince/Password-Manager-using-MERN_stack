# MLA Pass - Your Secure Password Manager
## Live Link : https://mlapass.vercel.app
## Note : Storing credentials on my live link is not secure because mongoDB is setted up to access from anywhere. For secure credentials storage you need to connect your own mongoDB URI as this app is just for personal credentials storage

![MLA Pass Screenshot](frontend/public/MLA%20Pass%201.jpg)

## Table of Contents
- [About MLA Pass](#about-mla-pass)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
  - [Vercel Deployment (Separate Backend & Frontend)](#vercel-deployment-separate-backend--frontend)
    - [Backend Deployment](#backend-deployment)
    - [Frontend Deployment](#frontend-deployment)
- [Contact](#contact)
- [License](#license)

## About MLA Pass
MLA Pass is a secure and user-friendly password manager built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows you to securely store, manage, and retrieve your credentials, helping you maintain a strong digital presence.

## Features
- **Secure Credential Storage:** Encrypted storage of your sensitive login information.
- **User Authentication:** Secure user registration and login.
- **Search & Filter:** Easily find your credentials with search functionality.
- **Responsive Design:** Access your passwords seamlessly on any device.
- **Rate Limiting:** Protects against brute-force attacks and ensures API stability using Upstash Redis.
- **Modern UI:** Clean and intuitive user interface built with React and Tailwind CSS.

## Technologies Used
**Frontend:**
- React.js
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Lucide React (Icons)
- React Router DOM (Routing)
- React Hot Toast (Notifications)
- Axios (HTTP Client)

**Backend:**
- Node.js
- Express.js (Web Framework)
- MongoDB (Database)
- Mongoose (MongoDB ODM)
- bcrypt (Password Hashing)
- crypto-js (Encryption)
- CORS (Cross-Origin Resource Sharing)
- dotenv (Environment Variables)
- Upstash Redis (Rate Limiting)

## Live Demo
- **MLA Pass (Live Link):** [https://mlapass.netlify.app](https://mlapass.netlify.app)

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- MongoDB Atlas Account (for cloud database) or local MongoDB instance
- Upstash Account (for Redis rate limiting)
- Git

### Local Development

#### Backend Setup
1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `backend` directory and add the following environment variables:
    ```
    PORT=5001
    MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"
    UPSTASH_REDIS_REST_URL="YOUR_UPSTASH_REDIS_REST_URL"
    UPSTASH_REDIS_REST_TOKEN="YOUR_UPSTASH_REDIS_REST_TOKEN"
    FRONTEND_URL="http://localhost:5173" # Or your frontend's local development URL
    ```
    *   Replace `"YOUR_MONGODB_CONNECTION_STRING"` with your MongoDB Atlas connection string.
    *   Replace `"YOUR_UPSTASH_REDIS_REST_URL"` and `"YOUR_UPSTASH_REDIS_REST_TOKEN"` with your Upstash Redis credentials.
4.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    The backend server will start on `http://localhost:5001`.

#### Frontend Setup
1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

## Deployment

### Vercel Deployment (Separate Backend & Frontend)
This project is designed for separate deployment of the backend and frontend on Vercel.

#### Backend Deployment
1.  **Go to Vercel Dashboard:** Log in to your Vercel account.
2.  **Add New Project:** Click "Add New..." -> "Project".
3.  **Import Git Repository:** Select your Git repository (e.g., from GitHub).
4.  **Configure Project:**
    *   **Root Directory:** Set this to `backend/`.
    *   **Build & Output Settings:** Vercel should auto-detect Node.js.
    *   **Environment Variables:** Add the following environment variables:
        *   `MONGO_URI`: Your MongoDB connection string.
        *   `UPSTASH_REDIS_REST_URL`: Your Upstash Redis REST URL.
        *   `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis REST Token.
        *   `FRONTEND_URL`: This will be the URL of your *deployed frontend* (e.g., `https://your-frontend-app.vercel.app`). You'll get this after deploying the frontend. Remember to update this after frontend deployment.
5.  **Deploy:** Click "Deploy".

#### Frontend Deployment
1.  **Go to Vercel Dashboard:** Log in to your Vercel account.
2.  **Add New Project:** Click "Add New..." -> "Project".
3.  **Import Git Repository:** Select your Git repository (the same one as the backend).
4.  **Configure Project:**
    *   **Root Directory:** Set this to `frontend/`.
    *   **Build & Output Settings:** Vercel should auto-detect Vite.
    *   **Environment Variables:** Add the following environment variable:
        *   `VITE_BACKEND_BASE_URL`: This will be the URL of your *deployed backend* (e.g., `https://your-backend-app.vercel.app/api`). You'll get this after deploying the backend.
5.  **Deploy:** Click "Deploy".

**Important Deployment Notes:**
*   **Order of Deployment:** It's recommended to deploy the backend first to obtain its URL, which is then used for the frontend configuration.
*   **Updating `FRONTEND_URL`:** Once your frontend is deployed and you have its URL, remember to go back to your *backend* project settings in Vercel and update the `FRONTEND_URL` environment variable with the actual URL of your deployed frontend. This is crucial for CORS to function correctly.

## Contact
- **Author:** Mohiuddin
- **GitHub:** [MLAPrince](https://github.com/MLAPrince)
- **LinkedIn:** [Mohiudeen](https://www.linkedin.com/in/mohiudeen-52bb35175)
- **Portfolio:** [Mohiuddin's Portfolio](https://mohiuddin-portfolio1.netlify.app)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
