import React from 'react';
import connect from '@vkontakte/vk-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

import Noise from './noise/noise'

const APP_ID = 7150170
const API_VERSION = "5.101"

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			userWall: [],
			userToken: null,
			currentNoises: [],
            currentPost: 0,
            firstRun: true
		};
	}

	async componentDidMount() {
		var fetchedUser = await connect.sendPromise('VKWebAppGetUserInfo', {});
		this.setState({fetchedUser: fetchedUser})
		var authToken = await connect.sendPromise("VKWebAppGetAuthToken", {
			"app_id": APP_ID, 
			"v": API_VERSION, 
			"scope": "wall"
		});
		this.setState({userToken: authToken.access_token})
	}

    async fillWall() {
        var wallContent = await connect.sendPromise(
            "VKWebAppCallAPIMethod", {
                "method": "wall.get", 
                "params": {
                    "v": API_VERSION, 
                    "owner_id": this.state.fetchedUser.id,
                    "count": 100, 
                    "filters": "owner", 
                    "access_token": this.state.userToken
            }
        });
        this.addFirstImages(wallContent.response.items)
        var filteredPosts = wallContent.response.items.filter(x => x.firstImage)
        this.setState({userWall: filteredPosts})
        this.playNoise()
        this.setState({firstRun: false})
    }

    addFirstImages(wall) {
        wall.forEach((e) => {
            if (e.attachments) {
                var photos = e.attachments.filter(x => x.type == "photo")
                if (photos.length > 0) {
                    var firstPhoto = photos[0].photo.sizes.filter(p => p.type == "x")[0].url
                    e.firstImage = firstPhoto
                    e.firstImageId = photos[0].photo.id
                }
            }
        })
    }

	async playNoise() {
        var noises = await Noise.update(this.state.userWall[this.state.currentPost])
        noises.forEach(x => x.image = x.image.replace('bg.jpg','fb.jpg'))
        this.setState({currentNoises: noises})
	}

	async shareNoise() {
		var noise = this.state.currentNoises[0]

		var message ="Hey, check it out! The '" + noise["title"] + "' soundset is a perfect ambient for my post.\n\n"
        if (this.state.userWall[this.state.currentPost].text) {
            message += '"' + this.state.userWall[this.state.currentPost].text + '"'
        }
        message += "\n\nYou can do the same in the Sonic Screwdriver app!"

        var attachments = ""
        var firstImageId = this.state.userWall[this.state.currentPost].firstImageId
        if (firstImageId) {
            attachments = ",photo" + this.state.fetchedUser.id + "_" + firstImageId
        }

        attachments = this.state.currentNoises[0].url + attachments
        console.log(attachments)

		await connect.sendPromise("VKWebAppShowWallPostBox", {
			"message": message,
			"attachments": attachments
		});
	}

    async switchPost(direction) {
        console.log(this.state.currentPost)
        await this.setState({
            currentPost: Math.abs(this.state.currentPost + direction) % this.state.userWall.length
        })
        this.playNoise()
    }

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" 
                    firstRun={this.state.firstRun}
                    onStart={() => this.fillWall()} 
                    fetchedUser={this.state.fetchedUser} 

                    currentNoises={this.state.currentNoises} 
                    onShare={() => this.shareNoise()}

                    onNext={() => this.switchPost(1)}
                    onPrev={() => this.switchPost(-1)}
                    currentPost={this.state.currentPost}
                    userWall={this.state.userWall}
                />
			</View>
		);
	}
}

export default App;
