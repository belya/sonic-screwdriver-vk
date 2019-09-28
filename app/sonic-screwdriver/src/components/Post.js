import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Button, Div, Avatar, PanelHeader } from '@vkontakte/vkui';


const Post = ({userWall, currentPost, onNext, onPrev}) => {
    if (userWall.length > 0) {

        return (<Group title="Post from wall">
            {userWall[currentPost].firstImage && <Div>
                <img src={userWall[currentPost].firstImage}/>
            </Div>}
            <Div>
                {userWall[currentPost].text}
            </Div>
            <Div style={{display: 'flex'}}>
                {currentPost < userWall.length && <Button size="l" stretched style={{ marginRight: 8 }} onClick={onNext}>Next</Button>}
                {currentPost > 0 && <Button size="l" stretched level="secondary" onClick={onPrev}>Previous</Button>}
            </Div>
        </Group>)
    }
    else {
        return ""
    }
};

Post.propTypes = {
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    currentPost: PropTypes.number,
    userWall: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            firstImage: PropTypes.string
        })
    ),
};

export default Post