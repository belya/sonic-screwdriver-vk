from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.contrib.fixers import ProxyFix
# from actions.text_embeddings import TextEmbeddings as Embeddings
# from actions.image_embeddings import ImageEmbeddings as Embeddings
from actions.joined_embeddings import JoinedEmbeddings as Embeddings

app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)
embeddings = Embeddings()


@app.route('/similar', methods=['POST'])
def post_get_similar_noises():
    post_body = request.get_json(force=True)
    prediction = embeddings.get_similar_noises(post_body)
    return jsonify(prediction)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, ssl_context='adhoc')
