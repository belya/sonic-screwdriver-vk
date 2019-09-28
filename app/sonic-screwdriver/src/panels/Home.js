import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Button, Div, Avatar, PanelHeader } from '@vkontakte/vkui';

import Noise from '../components/Noise';
import User from '../components/User';
import Post from '../components/Post';

const Home = ({ id, fetchedUser, userWall, currentPost, onStart, currentNoise, onShare, onNext, onPrev }) => (
	<Panel id={id}>
		<PanelHeader>Sonic Screwdriver</PanelHeader>
		<User fetchedUser={fetchedUser} onStart={onStart} />
		<Post 
			userWall={userWall} 
			currentPost={currentPost} 
			onNext={onNext} 
			onPrev={onPrev} 
		/>
		<Noise currentNoise={currentNoise} onShare={onShare} />
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	onStart: PropTypes.func,
	onShare: PropTypes.func,
	currentPost: PropTypes.number,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
	userWall: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string
		})
	),
	currentNoise: PropTypes.shape({
		title: PropTypes.string,
		image: PropTypes.string,
		text: PropTypes.string,
	})
};

export default Home;
