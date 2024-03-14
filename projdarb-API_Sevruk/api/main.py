from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, database
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_session_local():
    yield database.SessionLocal()

@app.get("/")
def main():
    return {"status" : "OK"}

@app.post("/api/scores")
async def create_score(
        score: schemas.ScoreCreate,
        db: Session = Depends(get_session_local)
    ):
        db_score = models.Score(playername=score.playername,score=score.score,mode=score.mode)
        db.add(db_score)
        try:
            db.commit()
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(e))
        return db_score

@app.get("/api/scores", response_model=list[schemas.Score])
def read_scores(mode: Optional[int] = None, db: Session = Depends(get_db)):

    query = db.query(models.Score).order_by(desc(models.Score.score))

    if mode is not None:
        query = query.filter(models.Score.mode == mode)

    return query.limit(10).all()

@app.get("/api/fruits", response_model=list[schemas.Fruit])
def read_fruits(db: Session = Depends(get_db)):
    fruits = db.query(models.Fruit).all()
    return fruits