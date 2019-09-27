from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.contrib.fixers import ProxyFix
from actions import embeddings

app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)


@app.route('/similar', methods=['POST'])
def post_get_similar_noises():
    post_body = request.get_json(force=True)
    prediction = embeddings.get_similar_noises(post_body)
    return jsonify(prediction)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, ssl_context='adhoc')
