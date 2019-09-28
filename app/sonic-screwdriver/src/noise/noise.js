const API_URL = "https://95.213.38.2:5000/similar"
// const API_URL = "https://localhost:5000/similar"

var Noise = {
    audios: [],
    promises: [],
    joinTexts: function(posts) {
        return posts.map(x => x.text).join(". ")
    },
    createBody: function(post) {
        return {
            "text": post.text,
            "image": post.firstImage
        }
    },
    updateNoises: function(post) {
        var postBody = Noise.createBody(post)
        return fetch(API_URL, {
            "method": "POST",
            "body": JSON.stringify(postBody)
        })
        .then(x => x.json())
    },
    stopNoise: function() {
        Noise.audios.map((audio, i) => {
            if (Noise.promises[i]) {
                Noise.promises[i].then(_ => audio.pause())
            }
        })
        Noise.promises = []
        Noise.audios = []
    },
    loadNoise: function(noiseId) {
        for (var i = 0; i < 10; i++) {
            var audio = new Audio('https://mynoise.net/Data/' + noiseId + '/' + i + 'a.ogg');
            Noise.audios.push(audio)
        }
        Noise.audios.map(e => e.load())
    },
    playNoise: function() {
        Noise.promises = Noise.audios.map(e => e.play())
    },
    update: async function(post) {
        Noise.stopNoise()
        var noises = await Noise.updateNoises(post)
        Noise.loadNoise(noises[0]["id"])
        Noise.playNoise()
        return noises
    }
}

export default Noise