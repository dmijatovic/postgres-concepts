from flask import request, render_template, url_for, flash, redirect
from dbman import app, db
from dbman.models import Person

routes=[
  {'path':"/","label":"Home"},
  {'path':'/person','label':'Add new person'},
  {'path':'/list','label':'List persons'},
]

@app.route("/")
def home():
  return render_template("home.html",
    title="Home page",
    pageTitle="Home",
    routes=routes,
    activeRoute="/")

@app.route("/person", methods=["GET","POST"])
def person():
  if request.method=="GET":
    return render_template("person.html",
      title="Add person",
      pageTitle="Add new person",
      routes=routes,
      activeRoute="/person")

  elif request.method=="POST":
    name = request.form['name']
    email = request.form['email']
    person = Person(name=name,email=email)
    db.session.add(person)
    db.session.commit()
    flash(f"The person {name} is added to database")
    # return f"You just posted name: {name} and email: {email}"
    return redirect(url_for('list_persons'))

@app.route("/list", methods=["GET"])
def list_persons():
  persons = Person.query.all()
  return render_template("list.html",
    title="List of persons",
    persons=persons,
    pageTitle="Persons",
    routes=routes,
    activeRoute="/list")