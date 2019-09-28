from actions.base_embeddings import Embeddings
from keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input, decode_predictions
from keras.models import Model
import numpy as np
import os
import urllib

class ImageEmbeddings(Embeddings):
    embeddings_path = "image"
    tmp_img_path = 'tmp.jpg'

    def _load_model(self):
        model = ResNet50(weights='imagenet')
        layer_name = 'avg_pool'
        self.intermediate_layer_model = Model(inputs=model.input, outputs=model.get_layer(layer_name).output)

    def _get_embedding(self, post):
        img_url = post["image"]
        urllib.request.urlretrieve(img_url,self.tmp_img_path)
        img = image.load_img(self.tmp_img_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        intermediate_output = self.intermediate_layer_model.predict(x)
        embed = intermediate_output[0]
        os.remove(self.tmp_img_path)
        return embed