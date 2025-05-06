from flask import Flask,jsonify,request
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS
from sqlalchemy import func
from db_config import db
from models import User,Request
from datetime import datetime

app=Flask(__name__)
CORS(app)


#Test(Raghul's) DB 
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:12345@localhost/project'


#Test(selva's) DB
# app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:root@localhost/Project'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db.init_app(app)

@app.before_request
def create_table():
    db.create_all()
    if not User.query.filter_by(role='admin').first():
        admin=User(name='adminraghul',role='admin',password=generate_password_hash("Password123"),access_component=["all"])
        db.session.add(admin)
        db.session.commit()


@app.route("/login",methods=["POST"])
def login():
    try:
        data=request.get_json()
        username=data["username"]
        password=data["password"]

        user=User.query.filter_by(name=username).first()
        if user and check_password_hash(user.password,password):
            return jsonify({"message":"success","user":user.name,"role":user.role,"access":user.access_component})
        else:
            return jsonify({"message":f"login failed with username {username}"})
        
    except Exception as e:
        return jsonify({"error":str(e)}),400
               
@app.route("/signUp",methods=["POST"])
def sign_up():
    try:
        data=request.get_json()
        username=data["username"]
        password=data["password"]

        if User.query.filter_by(name=username).first():
            return jsonify({"message":"Username already taken"})
        else:
            user=User(name=username,password=generate_password_hash(password))
            db.session.add(user)
            db.session.commit() 
            return jsonify({"message":"success"}),201
    
    except Exception as e:
        return jsonify({"error":e})

@app.route("/componentAccessRequest",methods=["POST"])
def access_request():
    data=request.get_json()
    username=data["username"]
    component=data["component"]

    user=User.query.filter_by(name=username).first()
    if not user:
        return jsonify({"message":"User not found"})
    
    if user.access_component and component in user.access_component:
        return jsonify({"message":"Access already granted, Kindly logout and login again"})
    
    existing_request=Request.query.filter_by(name=username,component=component,status='pending').first()

    if not existing_request:
        new_request=Request(name=username,component=component,processed_at=datetime.now())
        db.session.add(new_request)
        db.session.commit()
        return jsonify({"message":"Access requested"})
    else:
        return jsonify({"message":f"Already requested, request {existing_request.status}"})
    

@app.route("/processAccessRequest",methods=["POST"])
def process_request():
    data=request.get_json()
    username=data["username"]
    component=data["component"]
    bool=data["action"]

    user=User.query.filter_by(name=username).first()
    req=Request.query.filter_by(name=username,component=component,status='pending').first()

    if not user:
        return jsonify({"message":"User not found"})

    if bool:
        if user.access_component:
            if component in user.access_component:
                message="Access already granted"
            else:
                user.access_component=func.array_append(user.access_component,component)
                req.status='accepted'
                req.processed_at=datetime.now()
                db.session.commit()
                message="Access granted"
        else:
            user.access_component=[component]
            req.status='accepted'
            req.processed_at=datetime.now()
            db.session.commit()
            message="Access granted"
    else:
        req.status='rejected'
        req.processed_at=datetime.now()
        db.session.commit()
        message="Request rejected"

    return jsonify({"message":message})
    
@app.route("/getUserRequest")
def get_user():
    req=Request.query.all()
    users=[{"user":user.name,"component":user.component,"status":user.status,"processed_at":user.processed_at} for user in req]
    return users

if __name__=="__main__":
    app.run(debug=True)