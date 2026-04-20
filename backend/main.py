from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Enum as SQLEnum
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from datetime import datetime, timezone
from pydantic import BaseModel
from enum import Enum
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQL connection 
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class TransactionType(str, Enum):
    credit = "credit"
    debit = "debit"

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(
    DateTime(timezone=True),
    default=lambda: datetime.now(timezone.utc)
)
    description = Column(String, nullable=True)

# schema
class TransactionCreate(BaseModel):
    type: TransactionType
    amount: float
    date: datetime | None = None
    description: str | None = None


class TransactionResponse(BaseModel):
    id: int
    type: TransactionType
    amount: float
    date: datetime
    description: str | None

    class Config:
        from_attributes = True

Base.metadata.create_all(bind=engine)

# DB DEPENDENCY
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

        
@app.get("/")
def home():
    return {"message" : "server is running" }

# create transaction 
@app.post("/transactions", response_model=TransactionResponse)
def create_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    txn_data = data.model_dump(exclude_none=True)

    if "date" not in txn_data:
        txn_data["date"] = datetime.now(timezone.utc)

    txn = Transaction(**txn_data)

    db.add(txn)
    db.commit()
    db.refresh(txn)
    return txn


# Get all transactions
@app.get("/transactions", response_model=list[TransactionResponse])
def get_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).order_by(Transaction.date.desc()).all()

