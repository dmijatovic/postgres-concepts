from flask import Flask
from flask_sqlalchemy import SQLAlchemy

"""
Initialize this package
"""
app = Flask(__name__)

# Set the key for form protection of CSSF
app.config['SECRET_KEY']="01545c0cdd271a8177bea35d4d4b0517"
# define SQL track modifications in development
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# define postgress connection string (uri)
# the pattern is protocol://user:password@server/database
app.config['SQLALCHEMY_DATABASE_URI']="postgresql://postgres:changeme@localhost/sample_db"

db = SQLAlchemy(app)

from dbman import routes
