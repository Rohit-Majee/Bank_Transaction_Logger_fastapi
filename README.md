# Bank Transaction Logger

A full-stack web application to log and manage bank transactions (credit/debit), built with FastAPI (backend) and a Node.js-based frontend.

---

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

### Frontend

- React.js

---

## Features

- Add transactions (credit/debit)
- Store transaction data in database
- Fetch transaction history via API
- RESTful API design
- Scalable backend with PostgreSQL

---

---

## Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd project
```

---

### 2. Backend Setup (FastAPI)

#### Create virtual environment

```
cd backend
python -m venv venv
```

Activate it:

- Windows:

```
venv\Scripts\activate
```

- Mac/Linux:

```
source venv/bin/activate
```

#### Install dependencies

```
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
```

---

### 3. Setup PostgreSQL Database

Install and start PostgreSQL.

Create database:

```
psql -U postgres
CREATE DATABASE bank_db;
```

---

### 4. Configure Environment Variables

Create a `.env` file inside `backend/`:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/bank_db
```

---

### 5. Run Backend Server

```
uvicorn main:app --reload
```

API will be available at:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

### 6. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Create Transaction

```
POST /transactions
```

### Get All Transactions

```
GET /transactions
```

---

## Example Request Body

```
{
  "type": "credit",
  "amount": 1000,
  "date": "2026-04-20"
}
```

---

## Notes

- Database must be created manually in PostgreSQL.
- Tables are created automatically using SQLAlchemy.
- `.env` file is ignored in git for security.

---

## Future Improvements

- User authentication (JWT)
- Transaction categories
- Dashboard and analytics
- Pagination and filtering

---

## License

This project is for educational purposes.
