from flask import Flask,jsonify,request
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS
from sqlalchemy import func
from db_config import db
from models import User

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
            return jsonify({"message":"success"})
        else:
            return jsonify({"message":f"login failed with username {username}"}),401
        
    except Exception as e:
        return jsonify({"error":str(e)}),400
               
@app.route("/signUp",methods=["POST"])
def sign_up():
    try:
        data=request.get_json()
        username=data["username"]
        password=data["password"]

        if User.query.filter_by(name=username).first():
            return jsonify({"message":"Username already taken"}),400
        else:
            user=User(name=username,password=generate_password_hash(password))
            db.session.add(user)
            db.session.commit() 
            return jsonify({"message":"success"}),201
    
    except Exception as e:
        return jsonify({"error":e}),400

@app.route("/componentAccessRequest",methods=["POST"])
def access_request():
    data=request.get_json()
    username=data["username"]
    component=data["component"]
    user=User.query.filter_by(name=username).first()

    if user.access_component:
        if component in user.access_component:
            return jsonify({"message":"access already granted"})
        else:
            user.access_component=func.array_append(user.access_component,component)
            db.session.commit()
            return jsonify({"message":"success"}),201
    else:
        user.access_component=func.array_append(user.access_component,component)
        db.session.commit()
        return jsonify("message"),201

if __name__=="__main__":
    app.run(debug=True)