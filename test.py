from flask import Flask, send_from_directory, render_template

app = Flask(__name__)

@app.route('/')
def initHandle():
  return render_template('index.html')

@app.route('/<path:path>')
def handle(path):
  print(path)
  return send_from_directory('./templates', path, as_attachment=True)


@app.route('/static/css/<path:path>')
def handleStaticCss(path):
  print(path)
  return send_from_directory('./build/static/css', path, as_attachment=True)


@app.route('/static/js/<path:path>')
def handleStaticJs(path):
  print(path)
  return send_from_directory('./build/static/js', path, as_attachment=True)


@app.route('/static/media/<path:path>')
def handleStaticMedia(path):
  print(path)
  return send_from_directory('./build/static/media', path, as_attachment=True)


app.run(port=3002)