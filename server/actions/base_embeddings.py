import numpy as np
import pandas as pd
from tqdm import tqdm
import os

EMBEDDINGS_PATH = "./data/{}_embeddings.npy"

class Embeddings:
    embeddings_path = "default"

    def __init__(self):
        self.full_embeddings_path = EMBEDDINGS_PATH.format(self.embeddings_path)
        self.noises_df = pd.read_csv("./data/noises_with_translation.csv")
        self._load_model()
        self._cache_embeddings()

    def _load_model(self):
        raise Exception("Not implemented")

    def _cache_embeddings(self):
        if not os.path.isfile(self.full_embeddings_path):
            noise_embeddings_list = []
            for i, row in tqdm(self.noises_df.iterrows(), total=self.noises_df.shape[0]):
                vector = self._get_embedding({
                    "image": row["image"],
                    "text": row["translation"]
                })
                noise_embeddings_list.append(vector)
            self.noise_embeddings = np.vstack(noise_embeddings_list)
            np.save(self.full_embeddings_path, self.noise_embeddings)
        self.noise_embeddings = np.load(self.full_embeddings_path)

    def _get_embedding(self, post):
        raise Exception("Not implemented")

    def get_similar_noises(self, post):
        test_embeddings = self._get_embedding(post)

        norm_embeddings = (self.noise_embeddings ** 2).sum(axis=1) ** 0.5
        norm_test_embeddings = (test_embeddings ** 2).sum(axis=1) ** 0.5

        norm_products = norm_test_embeddings.reshape(1, -1).T @ norm_embeddings.reshape(1, -1)

        dot_products = test_embeddings @ self.noise_embeddings.T

        weights = dot_products / norm_products

        best_indices = np.argsort(-weights, axis=1)

        return self.noises_df.iloc[best_indices[0, :3]][["id", "url", "title", "text", "image"]].to_dict(orient='records')