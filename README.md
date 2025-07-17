# 🧠 MERN Admin Dashboard

A full-stack modern admin dashboard built using the MERN stack, featuring interactive charts, real-time data visualization, affiliate performance tracking, server-side pagination, and theming support.

---

## 🖼️ Screenshots

### 🌑 Dashboard – Dark Mode  
![Dashboard Dark Mode](https://github.com/user-attachments/assets/3d6a0084-51d1-4e33-aa19-d55ef4077b1f)

### 🌕 Dashboard – Light Mode  
![Dashboard Light Mode](https://github.com/user-attachments/assets/7d89e3a7-8d30-4cc1-b7e4-43d9ebf8ac7b)

---

## 🔧 Tech Stack

- **Frontend**: React.js + Redux Toolkit + Material UI (MUI v5)
- **Data Fetching**: Redux Toolkit Query (RTK Query)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Visualization**: Nivo Charts, MUI Data Grid

---

## 🔑 Features

- 📊 Real-time dashboard analytics with dynamic charts
- 📦 Product, customer, and transaction management
- 🌍 Geography chart using user location data
- 📈 Daily & monthly sales line charts
- 💼 Affiliate sales performance tracking
- ⚙️ Server-side pagination using MongoDB aggregation
- 🌗 Light/Dark mode toggle with Material UI theming
- 🔐 Role-based structure: Admin & Superadmin

---

## 🚀 Getting Started Locally
```bash
1. Clone the Project
git clone https://github.com/Ahmedabdelaziz77/ECOMVISION.git
cd ECOMVISION

2. Setup Backend
cd server
npm install
Create a .env file in the server folder:
env
PORT=3001
MONGO_URL=your_mongo_connection
Start the backend:
npm run start

3. Setup Frontend
cd client
npm install
npm run start
