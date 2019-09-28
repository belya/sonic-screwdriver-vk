const API_URL = "https://95.213.38.2:5000/similar"
// const API_URL = "https://localhost:5000/similar"

var Noise = {
    audios: [],
    joinTexts: function(posts) {
        return posts.map(x => x.text).join(". ")
    },
    updateNoise: function(post) {
        var joinedText = post.text // Noise.joinTexts(posts)
        return fetch(API_URL, {
            "method": "POST",
            "body": JSON.stringify({
                "text": joinedText
            })
        })
        .then(x => x.json())
        .then(x => x[0])
    },
    stopNoise: function() {
        try {
            Noise.audios.map(e => e.pause())
            Noise.audios = []
        }
        catch (error) {
            
        }
    },
    loadNoise: function(noiseId) {
        for (var i = 0; i < 10; i++) {
            var audio = new Audio('https://mynoise.net/Data/' + noiseId + '/' + i + 'a.ogg');
            Noise.audios.push(audio)
        }
        Noise.audios.map(e => e.load())
    },
    playNoise: function() {
        Noise.audios.map(e => e.play())
    },
    update: async function(post) {
        Noise.stopNoise()
        var noise = await Noise.updateNoise(post)
        Noise.loadNoise(noise["id"])
        Noise.playNoise()
        return noise
    }
}

export default Noise