from actions.base_embeddings import Embeddings
from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, decode_predictions
from keras.models import Model
import numpy as np
import os
import urllib
import tensorflow as tf
from tensorflow.python.keras.backend import set_session
from time import time

session = tf.Session()
graph = tf.get_default_graph()


class ImageEmbeddings(Embeddings):
    embeddings_path = "image"

    def _load_model(self):
        global graph, session

        set_session(session)
        model = ResNet50(weights='imagenet')
        self.model = model
        layer_name = 'avg_pool'
        self.intermediate_layer_model = Model(
            inputs=model.input, 
            outputs=model.get_layer(layer_name).output
        )

    def generate_tmp_file(self):
        return 'tmp{}.jpg'.format(int(time() * 1000))

    def _get_embedding(self, post):
        global graph, session

        img_url = post["image"].replace('/bg.jpg','/fb.jpg')
        tmp_img_path = self.generate_tmp_file()
        urllib.request.urlretrieve(img_url, tmp_img_path)
        img = image.load_img(tmp_img_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        set_session(session)
        with graph.as_default():
            intermediate_output = self.model.predict(x)

        embed = intermediate_output
        os.remove(tmp_img_path)
        return embed