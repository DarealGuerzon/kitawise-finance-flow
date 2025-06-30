# **KITAWISE**

KitaWise is a web-based smart financial assistant built specifically for Filipino freelancers and micro-entrepreneurs. It helps users track income, monitor expenses, and understand their financial standing—all in one platform. With its user-friendly interface, localized design, and AI-powered insights, KitaWise simplifies bookkeeping and budgeting, enabling freelancers to make smarter decisions, set goals, and treat their work as a real business, not just one-time gigs.


**Note:** Version 1 is in the `kitawise-v1` branch

---

## ✨ Features

- **Frontend**:  
  - Built with **React** + **TypeScript**  
  - Modern styling with **shadcn/ui** and **Tailwind CSS**  
  - Data visualization using **Recharts**

- **Backend**:  
  - Developed with **Node.js**, **Express**, and **TypeScript**  
  - Authentication with **OAuth2** and **JWT**  
  - Database powered by **MongoDB** via **Mongoose**  
  - AI Integration with **Hugging Face** and **Llama** APIs

- **Authentication**:
  - OAuth2 login with **Google** and **Facebook**

---

## 🛠️ Tech Stack

| Layer      | Technology                                |
|------------|-------------------------------------------|
| **Frontend**  | React, TypeScript, Tailwind CSS, shadcn/ui, Recharts |
| **Backend**   | Node.js, Express, TypeScript, Mongoose |
| **Database**  | MongoDB                                 |
| **AI Models** | Hugging Face, Llama APIs               |
| **Auth**      | OAuth2, JWT                            |

---

## ⚡ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/DarealGuerzon/kitawise-finance-flow/tree/kitawise-v1
cd your-repo
```

### 2️⃣ Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Setup

Create the following `.env` files in each directory.

---

### 📂 `backend/.env`

```env
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# AI Integration
HUGGING_FACE_API_KEY=your_hugging_face_api_key
LLAMA_API_URL=https://api.llama.com/endpoint
```

---

### 📂 `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Running the Application

> Make sure MongoDB is running or accessible via connection string.

### Start Backend
```bash
cd server
npm install
node index.js
```

### Start Frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 💻 Usage

1. **Visit** `http://localhost:8080`(frontend) and `http://localhost:8080`(backend) 
2. **Sign/Log in** 
3. Interact with the web application and the AI features.
4. Explore analytics and user-specific data.

---

## 🧩 Project Structure

```
repo/
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
└── README.md
```
