import tensorflow as tf
import tensorflow_hub as hub
from actions.base_embeddings import Embeddings

class TextEmbeddings(Embeddings):
    embeddings_path = "text"

    def _load_model(self):
        self.session = tf.Session()
        self.sentences = tf.placeholder(tf.string)
        # self.elmo = hub.Module("http://files.deeppavlov.ai/deeppavlov_data/elmo_ru-news_wmt11-16_1.5M_steps.tar.gz", trainable=False)
        self.elmo = hub.Module("https://tfhub.dev/google/elmo/1", trainable=True)
        self.embeddings = self.elmo(self.sentences)
        self.session.run(tf.global_variables_initializer())

    def _get_embedding(self, post):
        text = post["text"]
        return self.session.run(self.embeddings, {
            self.sentences: [text]
        })