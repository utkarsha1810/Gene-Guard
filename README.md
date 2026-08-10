# 🧬 Gene-Guard

A comprehensive, AI-enhanced platform for DNA testing guidance using **Gemini AI** and **MongoDB**. Helps patients understand genetic findings, choose appropriate tests, and receive personalized guidance through 6 intelligent agents.

## ✨ Features

- **6 AI-Powered DNA Agents** — Guidance, Test Suggestion, Sample Process, Report Simplifier, Recommendation, and Escalation
- **Gemini AI Integration** — Real-time AI-enhanced analysis with rule-based fallback
- **Patient Profile Management** — Rich intake forms with live risk evaluation
- **Interactive Dashboard** — Dynamic charts, risk trends, and emergency action controls
- **Dark/Light Mode** — Full theme support across the agent dashboard
- **Emergency Escalation** — Interactive map, call/SMS actions, and alert system

## 📋 Prerequisites

- **Node.js** v18+ and **npm**
- **MongoDB** running locally (`mongodb://localhost:27017`) or a MongoDB Atlas connection string
- **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/apikey)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/utkarsha1810/Gene-Guard.git
cd Gene-Guard
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and fill in your values:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5050
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gene-guard
```

Start the backend:

```bash
npm start
```

The backend will run at `http://localhost:5050`.

### 3. Frontend Setup (Gene-Guard-main — CRA)

```bash
cd Gene-Guard-main
npm install
cp .env.example .env
```

Edit `Gene-Guard-main/.env`:

```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_API_URL=http://localhost:5050/api
```

Start the frontend:

```bash
npm start
```

The frontend will run at `http://localhost:3000`.

### 4. Frontend Setup (frontend/ — Vite)

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5050/api
```

Start the dev server:

```bash
npm run dev
```

## 🏗️ Project Structure

```
Gene-Guard/
├── backend/                     # Express.js API server
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── systemPrompts.js     # AI agent system prompts
│   ├── middleware/
│   │   └── inputValidation.js   # Request validation & filtering
│   ├── models/                  # MongoDB schemas
│   │   ├── DNATest.js
│   │   ├── Patient.js
│   │   └── TestResult.js
│   ├── routes/
│   │   ├── dnaAgents.js         # All 6 DNA agent endpoints
│   │   ├── health.js            # Health check & config
│   │   └── patients.js          # Patient CRUD
│   ├── services/
│   │   └── geminiService.js     # Google Gemini integration
│   ├── tests/                   # Agent test scripts
│   ├── utils/                   # Logger, rate limiter
│   ├── server.js                # Main server entry point
│   ├── .env.example             # Environment template
│   └── package.json
│
├── Gene-Guard-main/             # React frontend (CRA)
│   ├── src/
│   │   ├── Components/          # UI components
│   │   ├── data/                # Agent configs & logic
│   │   ├── services/            # API client & Gemini service
│   │   └── utils/               # Constants & formatters
│   ├── .env.example             # Environment template
│   └── package.json
│
├── frontend/                    # React frontend (alternative)
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── data/                # Agent configs
│   │   └── services/            # API & Gemini client
│   ├── .env.example             # Environment template
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🤖 DNA Agents

Each agent uses **Gemini AI** with fallback to intelligent rule-based logic:

| Agent | Purpose |
|-------|---------|
| 🧭 **Guidance Agent** | Recommends a DNA testing pathway based on patient profile |
| 🔬 **Test Suggestion Agent** | Suggests the most suitable DNA test category |
| 🧪 **Sample Process Agent** | Guides sample collection method and precautions |
| 📋 **Report Simplifier Agent** | Translates clinical findings to patient-friendly language |
| 💡 **Recommendation Agent** | Advises on practical next steps after results |
| 🚨 **Escalation Agent** | Assesses urgency and escalation level with emergency actions |

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |
| `GET` | `/api/dna/configs` | Get agent configurations |
| `POST` | `/api/dna/run/:agentId` | Run a specific DNA agent |
| `POST` | `/api/dna/patient/evaluate` | Evaluate patient risk profile |
| `POST` | `/api/dna/simplify-report-ai` | Direct report simplification |

## 🛡️ Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `PORT` | No | Server port (default: `5050`) |
| `NODE_ENV` | No | Environment (default: `development`) |
| `MONGODB_URI` | No | MongoDB connection string (default: `mongodb://localhost:27017/gene-guard`) |

### Frontend — CRA (`Gene-Guard-main/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_GEMINI_API_KEY` | No | Gemini key for direct frontend AI calls |
| `REACT_APP_API_URL` | No | Backend API URL (default: `http://localhost:5050/api`) |

### Frontend — Vite (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | Backend API URL (default: `http://localhost:5050/api`) |

## 🧪 Running Tests

```bash
cd backend
node tests/test-agents.js
```

> **Note:** The backend server must be running before executing tests.

## ❓ FAQ

**Q: What if Gemini API fails?**
A: All agents automatically fall back to intelligent rule-based logic. The app remains fully functional without AI.

**Q: Can I use MongoDB Atlas instead of local MongoDB?**
A: Yes. Set `MONGODB_URI` in your `.env` to your Atlas connection string.

**Q: Is an internet connection required?**
A: MongoDB can be local. Gemini requires internet, but the rule-based fallback works offline.

## 📝 License

MIT
