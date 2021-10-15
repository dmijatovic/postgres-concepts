from dbman import db

class Person(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  email = db.Column(db.String(100), nullable=False)

  def __repr__(self):
    return f"Person {self.name} with email {self.email}"