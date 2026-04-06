# College Event Management System (Node.js Version)

## 📌 Overview
This is a full-stack College Event Management System built using:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL

It allows students and organizers to manage and participate in college events.

---

## 🚀 Features

### 👩‍🎓 Student
- Sign up and login
- View all events
- Register for events
- Dashboard with real-time events

### 🧑‍💼 Organizer
- Sign up and login
- Create and manage events
- View created events

### 🔐 Authentication
- Secure login/signup using bcrypt
- Role-based access (student / organizer)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL (mysql2)
- bcryptjs
- dotenv

---

## 📂 Project Structure

```
project/
│── server.js        # Main backend server
│── db.js            # Database connection
│── app.js           # API routes (optional)
│── *.html           # Frontend pages
│── README.md        # Project documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Install Node.js
Download and install from: https://nodejs.org/

### 2️⃣ Install Dependencies
Run this in your project folder:
```
npm install express mysql2 bcryptjs dotenv cors
```

---

### 3️⃣ Database Setup

Open MySQL and run:
```
CREATE DATABASE college_events;
```

Update `db.js`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_events
```

---

### 4️⃣ Run Backend Server

```
node server.js
```

Server will run at:
```
http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint              | Description              |
|--------|----------------------|--------------------------|
| POST   | /api/signup          | Register user            |
| POST   | /api/login           | Login user               |
| GET    | /api/events          | Get all events           |
| POST   | /api/events/create   | Create event             |

---

## 🌐 Frontend Setup

Open `index.html` in browser OR use Live Server.

⚠️ IMPORTANT:
Replace old PHP APIs like:
```
api/get_events.php
```

With:
```
http://localhost:3000/api/events
```

---

## 🔄 How It Works

1. User signs up/login
2. Organizer creates events
3. Events stored in MySQL
4. Students fetch events via API
5. Real-time display on dashboard

---

## 🧪 Demo Mode (Optional)

If backend is not running:
- Uses localStorage
- Works as static project
- Data is not permanent

---

## 📌 Notes

- Ensure MySQL is running
- Backend must start before frontend
- Check API URLs properly
- Use correct DB credentials

---

## 👩‍💻 Author
Yuktha Shree

---

## ⭐ Future Improvements
- JWT Authentication
- Admin panel
- Image upload for events
- Email notifications
