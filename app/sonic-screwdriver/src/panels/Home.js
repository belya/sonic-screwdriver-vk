import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Button, Div, Avatar, PanelHeader } from '@vkontakte/vkui';

const Home = ({ id, fetchedUser, userWall, onClick, currentNoise }) => (
	<Panel id={id}>
		<PanelHeader>Sonic Screwdriver</PanelHeader>
		{fetchedUser &&
		<Group title="User">
			<ListItem
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</ListItem>
			<Div>
				<Button size="xl" level="secondary" onClick={onClick}>Listen</Button>
			</Div>
		</Group>}
		{currentNoise &&
		<Group title="Current background">
			<ListItem
				before=<Avatar type="image" src={currentNoise.image}/>
				description={currentNoise.text}
			>
				{currentNoise.title}
			</ListItem>
		</Group>}
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func,
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
