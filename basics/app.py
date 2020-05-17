from dbman import app

if __name__ == '__main__':
  # This debug mode is not executed when in uwsgi mode
  app.run(debug=True)