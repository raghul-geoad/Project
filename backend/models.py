from db_config import db
from sqlalchemy.dialects.postgresql import ARRAY

class User(db.Model):
    __tablename__="users"
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),unique=True,nullable=False)
    password=db.Column(db.String,nullable=True)
    role=db.Column(db.String(50),nullable=True,default='user')
    access_component=db.Column(ARRAY(db.String),nullable=True)

class Request(db.Model):
    __tablename__="request"
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),nullable=False)
    component=db.Column(db.String,nullable=False)