from actions.base_embeddings import Embeddings
from actions.image_embeddings import ImageEmbeddings
from actions.text_embeddings import TextEmbeddings
import numpy as np

class JoinedEmbeddings(Embeddings):
    embeddings_path = "joined"

    def _load_model(self):
        self.image_embeddings = ImageEmbeddings()
        self.text_embeddings = TextEmbeddings()

    def _get_embedding(self, post):
        if post["image"]:
            image = self.image_embeddings._get_embedding(post)
        else:
            image = np.zeros(shape=(1, 1000))
        text = self.text_embeddings._get_embedding(post)
        return np.hstack([text, image])