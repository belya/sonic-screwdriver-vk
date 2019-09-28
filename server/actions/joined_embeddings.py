from actions.base_embeddings import Embeddings
from actions.image_embeddings import ImageEmbeddings
from actions.text_embeddings import TextEmbeddings
import numpy as np

class JoinedEmbeddings(Embeddings):
    image_embeddings_dim = 2048
    embeddings_path = "joined"
    text_weight = 0.8
    image_weight = 0.3

    def _load_model(self):
        self.image_embeddings = ImageEmbeddings()
        self.text_embeddings = TextEmbeddings()

    def _cache_embeddings(self):
        pass

    def get_distances(self, post):
        closest_by_image = self.image_embeddings.get_distances(post)
        closest_by_text = self.text_embeddings.get_distances(post)
        if not post["text"]:
            closest = closest_by_image
        else:
            closest = self.text_weight * closest_by_image + self.image_weight * closest_by_text
        return closest

