# 🚀 InsightHub

**InsightHub** is your intelligent data companion. It transforms your raw Excel or CSV files into meaningful **visual insights** and delivers **AI-powered suggestions** in seconds. With built-in **data visualizations**, a smart **AI assistant**, and support for **file-based conversations**, InsightHub is a game-changer for data analysis.

---

## 🔍 What is InsightHub?

**InsightHub** is an all-in-one analytics and AI platform that:
- Parses `.csv` or `.xlsx` files
- Auto-generates visualizations like pie charts and bar graphs
- Provides AI-generated insights about your data
- Supports file-based interaction with an AI chatbot
- Allows regular Q&A with the AI assistant too

Whether you're a student, analyst, educator, or business owner — **InsightHub helps you understand your data better and faster.**

---

## ✨ Features

✅ Upload `.csv` or `.xlsx` files for analysis  
✅ Auto-generate Pie Chart & Bar Graph from data  
✅ Get instant **AI-generated suggestions** based on file content  
✅ **Chatbot with file support** — ask questions about your uploaded data  
✅ **Regular chatbot support** for general queries  
✅ Secure login system with CSRF protection  
✅ Smooth UI with modern animations and dark mode  

---

## 🛠️ Tech Stack

### 🔹 Frontend (📁 `Auto Insights`)
- **React.js** with **Vite**
- **Tailwind CSS** for modern UI
- **Framer Motion** for animations
- **Lucide-react Icons**
- **Axios** for API communication
- **React Router DOM**

### 🔹 Backend (📁 `backend`)
- **Django** with **Django REST Framework**
- **Pandas & OpenPyXL** for Excel/CSV parsing
- **Matplotlib / Plotly** for chart data
- **Custom AI logic** for data suggestions
- **CSRF & Session-based authentication**

### 🔹 Hosting
- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Railway](https://railway.app)

---

## 🌐 Live Demo

🔗 **Frontend URL:** [https://insight-hub-nine.vercel.app/](https://insight-hub-nine.vercel.app/)  
📡 **Backend URL:** [https://insights-backend-production.up.railway.app](https://insights-backend-production.up.railway.app)

---

## 🗂️ Project Structure

```bash
Excel to Insights Project/
├── Auto Insights/               # Frontend - React App
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── assets/
│   │   └── App.jsx
│   └── vite.config.js
│
├── backend/                     # Backend - Django App
│   ├── insights/                # Main Django App
│   ├── core/                    # Custom User + Auth
│   ├── services/                # AI Suggestions & Chart Data
│   ├── media/                   # Uploaded files
│   ├── manage.py
│   └── requirements.txt
│
└── README.md

```

## 🛠️ Installation

- ### Clone the Repository
```bash
git clone https://github.com/your-username/auto-insights.git
cd auto-insights
```
- ### Setup the Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate           # On Windows: venv\Scripts\activate
pip install -r requirements.txt

```

- ### Create .env file and set environment variables (DEBUG, SECRET_KEY, etc.)

- ### Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

- ### Create Superuser (optional)
```bash
python manage.py createsuperuser
```


- ### Start Backend Server
```bash
python manage.py runserver
```

---

### 🚀 Built with ❤️ by [Zaid Khan](https://www.linkedin.com/in/zaid-khan-1123abc/)

