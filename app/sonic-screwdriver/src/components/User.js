import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Button, Div, Avatar, PanelHeader } from '@vkontakte/vkui';


const User = ({fetchedUser, onStart}) => {
    if (fetchedUser) {
        return (<Group title="User">
            <ListItem
                before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
            >
                {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
            </ListItem>
            <Div>
                <Button size="xl" level="secondary" onClick={onStart}>Listen</Button>
            </Div>
        </Group>)
    }
    else {
        return ""
    }
};

User.propTypes = {
    onStart: PropTypes.func,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default User