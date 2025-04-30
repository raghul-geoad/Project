from flask import Flask,jsonify,request
from werkzeug.security import generate_password_hash,check_password_hash
from flask_cors import CORS
from db_config import db
from models import User

app=Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:12345@localhost/project'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db.init_app(app)

@app.before_request
def create_table():
    db.create_all()
    if not User.query.filter_by(role='admin').first():
        admin=User(name='raghul',role='admin',password=generate_password_hash("12345678"),access_component=["all"])
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
            return jsonify({"message":f"login failed with username {username}"})
        
    except Exception as e:
        return jsonify({"error":str(e)})
               
@app.route("/signUp",methods=["POST"])
def sign_up():
    try:
        data=request.get_json()
        username=data["username"]
        password=data["password"]
        confirm_password=data["confirm_password"]

        if password!=confirm_password:
            return jsonify({"message:Password and Cofirm Password does not match"}),401

        if User.query.filter_by(name=username):
            return jsonify({"message":"Username already taken"}),400
        else:
            user=User(name=username,password=generate_password_hash(password))
            db.session.add(user)
            db.session.commit() 
            return jsonify({"message":"success"})
    
    except Exception as e:
        return jsonify({"error":str(e)})


if __name__=="__main__":
    app.run(debug=True)