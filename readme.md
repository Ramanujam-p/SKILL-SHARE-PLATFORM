# 🚀 Skill Share – Interactive Student Dashboard

Skill Share is a full-stack web application designed to connect university students based on shared skills, interests, and learning goals. It provides a collaborative platform where students can find like-minded peers, ask and answer questions, build connections, and communicate through real-time chat.

---

## 📌 Problem Statement

Many students struggle to find peers with similar skills and interests within their university, leading to limited collaboration and missed learning opportunities.

**Skill Share solves this problem** by acting as a connecting bridge among students, enabling skill-based networking, peer learning, and real-time communication.

---

## ✨ Features

### 🔐 Authentication

* Google Sign-In (persistent user data)
* Guest Login (temporary session data)

### 🧑‍💼 Profile Setup

* Multi-step onboarding
* Skill selection (Web Development, AI/ML, DSA, etc.)
* Skill level selection (Beginner / Intermediate / Advanced)
* Profile details (name, college, course, ID, profile photo URL)

### 📊 Dashboard

* Active peers count
* Total registered users
* Questions asked & answers given
* Current connections overview

### 🤝 Skill Match

* Connect with users having similar skill sets
* Ranking based on skill-matching score
* Helps users find the most relevant peers

### ❓ Help Desk

* Ask questions with title, description, and tags
* Answer questions posted by other students
* University-wide visibility for collaboration

### 🔗 Connections

* Send and receive connection requests
* View accepted connections

### 💬 Chat System

* One-to-one chat with connections
* Group chat for collaborative discussions
* Real-time messaging using Firebase

### 🧾 Profile Management

* Update profile details
* Real-time sync with database

### ⚙️ Settings

* Functional settings page for account preferences

### 🚪 Secure Logout

* Safe sign-out from the application

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **TypeScript**
* **CSS**

### Backend

* **Node.js**

### Database & Services

* **Firebase Authentication**
* **Firebase Firestore (Real-time Database)**

### UI/UX

* **Figma**

---

## 🗂️ Firebase Collections

* `users`
* `skillRequests`
* `questions`
* `answers`
* `notifications`
* `connections`
* `chats`
* `groupChats`

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* Firebase project setup

### Installation

```bash
git clone https://github.com/your-username/skill-share.git
cd skill-share
npm install
```

### Run the Project

```bash
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file and add your Firebase credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## 📽️ Demo

🎥 **Demo Video:** *https://drive.google.com/file/d/1WKolKgr4np_-KJQcXdrbVLQjfxiHwZ-K/view?usp=drivesdk*
🌐 **Live Website:** *https://ramanujam-skill-share-platform.netlify.app/*

---

## 🧠 Future Enhancements

* Advanced recommendation algorithm
* Admin dashboard
* File sharing in chat
* Notification system enhancements
* Mobile app version

---

## 🤝 Contributors

* **Bhuvaneshwar TS** – Backend Lead
* **Nitesh ND** – Frontend Lead
* **Ramanujam P(me)** - Frontend Developer
* **Yuvasri K** - Backend Developer

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Acknowledgements

* Firebase Documentation
* React Community
* Figma Community

---

