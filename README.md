# AI Snippet - House Numbers Tech Challenge

This project is a fullstack application built with **Node.js**, **MongoDB**, and **Remix**. It allows users to submit a block of text, receive an AI-generated summary via streaming, and view a paginated history of their past requests.

---

## Architecture

- **Frontend**: Remix + React + Tailwind CSS (runs on port `3030`)
- **Backend**: Express.js with OpenAI integration (runs on port `3000`)
- **Database**: MongoDB containerized and managed via Docker Compose

Although frontend and backend are in the same repository, they are independent and communicate via HTTP requests.

---

##  Quickstart

### 1. Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Set up environment variables

Create a `.env` file in the **backend** (use .env.example as reference) directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
MONGO_URI=mongodb://mongo:32000/mydb
```

You can obtain your OpenAI API key at:
👉 https://platform.openai.com/account/api-keys

### 3. Run everything with Docker

```bash
docker-compose up --build
```

- Frontend available at: `http://localhost:3030`
- Backend API available at: `http://localhost:3000`
- MongoDB available internally via Docker at `mongo:32000`

---

## API Endpoints (via Postman / curl)

### Create Snippet (AI Summary)

**POST** `http://localhost:3000/api/snippets`

#### Request body:
```json
{
  "text": "Node.js is a powerful platform for building server-side apps."
}
```

#### curl:
```bash
curl -X POST http://localhost:3000/api/snippets \
  -H "Content-Type: application/json" \
  -d '{ "text": "Node.js is a powerful platform for building server-side apps." }'
```

### Get Snippet by ID

**GET** `http://localhost:3000/api/snippets/:id`

### List Snippets (paginated)

**GET** `http://localhost:3000/api/snippets?page=1&limit=5`

---

## Running Tests

Tests are implemented using **Vitest** (unit/component) and **Supertest** (API).

### Backend Tests:
```bash
cd backend
npx vitest run
```

### Frontend Tests:
```bash
cd frontend
npx vitest run
```

---

## Notes

- The frontend supports real-time streaming of summaries using SSE.
- MongoDB volume is persisted via Docker (`mongo-data` volume).
- React components are modularized: `SummaryForm`, `SummaryDisplay`, `SnippetList`, `TextModal`.
- Errors are handled and displayed using Tailwind-styled alerts.

---

## Requirements
- Node.js 20+
- Docker + Docker Compose
- OpenAI API key
