import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pandas as pd
from tqdm import tqdm
import os


EMBEDDINGS_PATH = "./data/noise_embeddings.npy"


session = None
sentences = None
embeddings = None
noises_df = None
noise_embeddings = None
img2vec = None


def load_df():
    global noises_df
    noises_df = pd.read_csv("./data/noises_with_translation.csv")

def load_tf():
    global session, sentences, embeddings
    session = tf.Session()
    sentences = tf.placeholder(tf.string)
    elmo = hub.Module("http://files.deeppavlov.ai/deeppavlov_data/elmo_ru-news_wmt11-16_1.5M_steps.tar.gz", trainable=False)
    embeddings = elmo(sentences)
    session.run(tf.global_variables_initializer())

def load_embeddings():
    global noises_df, session, sentences, embeddings, noise_embeddings
    if not os.path.isfile(EMBEDDINGS_PATH):
        noise_embeddings_list = []
        for text in tqdm(noises_df["translation"]):
            vector = get_text_embeddings(text)
            noise_embeddings_list.append(vector)
        noise_embeddings = np.vstack(noise_embeddings_list)
        np.save(EMBEDDINGS_PATH, noise_embeddings)
    noise_embeddings = np.load(EMBEDDINGS_PATH)

def load_models():
    load_df()
    load_tf()
    load_embeddings()

def get_text_embeddings(text):
    global session, embeddings, sentences
    return session.run(embeddings, {
        sentences: [text]
    })

def get_similar_noises(post):
    global noise_embeddings, noises_df

    test_embeddings = get_text_embeddings(post["text"])

    norm_embeddings = (noise_embeddings ** 2).sum(axis=1) ** 0.5
    norm_test_embeddings = (test_embeddings ** 2).sum(axis=1) ** 0.5

    norm_products = norm_test_embeddings.reshape(1, -1).T @ norm_embeddings.reshape(1, -1)

    dot_products = test_embeddings @ noise_embeddings.T

    weights = dot_products / norm_products

    best_indices = np.argsort(-weights, axis=1)

    return noises_df.iloc[best_indices[0, :3]]["id"].tolist()


load_models()