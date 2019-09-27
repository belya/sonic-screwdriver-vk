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
			userWall: null,
			userToken: null
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

	async playNoise() {
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
        Noise.update(this.state.userWall)
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" onClick={() => this.playNoise()} fetchedUser={this.state.fetchedUser} />
			</View>
		);
	}
}

export default App;
