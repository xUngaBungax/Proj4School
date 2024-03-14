from sqlalchemy import Column, Integer, String
from .database import Base

class Fruit(Base):
    __tablename__ = "fruits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    
class Score(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True, index=True)
    playername = Column(String, index=True)
    score = Column(Integer, index=False)
    mode = Column(Integer, index=False)