from pydantic import BaseModel

class Fruit(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
        
class Score(BaseModel):
    id: int
    playername: str
    score: int
    mode: int

    class Config:
        from_attributes = True
        
class ScoreCreate(BaseModel):
    playername: str
    score: int
    mode: int