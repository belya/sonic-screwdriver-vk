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
			currentNoise: null,
            currentPost: 0
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
        this.setState({userWall: wallContent.response.items})
        this.playNoise()
    }

	async playNoise() {
        var noise = await Noise.update(this.state.userWall[this.state.currentPost])
        console.log(noise)
        this.setState({currentNoise: noise})
	}

	async shareNoise() {
		var noise = this.state.currentNoise
		var message ="My favourite noise is " + noise["title"] + ". \n\n What about your? Check it in Sonic Screwdriver app!"
		await connect.sendPromise("VKWebAppShowWallPostBox", {
			"message": message,
			"attachments": "https://m.vk.com/app" + APP_ID
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
                    onStart={() => this.fillWall()} 
                    fetchedUser={this.state.fetchedUser} 

                    currentNoise={this.state.currentNoise} 
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
