import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Button, Div, Avatar, PanelHeader } from '@vkontakte/vkui';

import Noise from '../components/Noise';
import User from '../components/User';
import Post from '../components/Post';

const Home = ({ id, fetchedUser, onCurrentNoiseChange, currentNoiseIndex, userWall, currentPost, onStart, currentNoises, onShare, onNext, onPrev, firstRun }) => (
	<Panel id={id}>
		<PanelHeader>Sonic Screwdriver</PanelHeader>
		<User fetchedUser={fetchedUser} onStart={onStart} firstRun={firstRun} />
		<Post 
			userWall={userWall} 
			currentPost={currentPost} 
			onNext={onNext} 
			onPrev={onPrev} 
			firstRun={firstRun}
		/>
		<Noise 
			currentNoises={currentNoises} 
			onShare={onShare} 
			onCurrentNoiseChange={onCurrentNoiseChange}
			currentNoiseIndex={currentNoiseIndex}
		/>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	onStart: PropTypes.func,
	onShare: PropTypes.func,
	onCurrentNoiseChange: PropTypes.func,
	currentPost: PropTypes.number,
	currentNoiseIndex: PropTypes.number,
	firstRun: PropTypes.bool,
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
			text: PropTypes.string,
			firstImage: PropTypes.string
		})
	),
	currentNoises: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			image: PropTypes.string,
			text: PropTypes.string,
		})
	)
};

export default Home;
