import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Button, Div, Avatar, PanelHeader, Gallery } from '@vkontakte/vkui';


const Post = ({firstRun, userWall, currentPost, onNext, onPrev}) => {
    if (userWall.length > 0) {
        return (<Group title="Post from wall">
            {userWall[currentPost].firstImage && <Div>
                <img style={{width: "50%", display: "block", margin: "auto"}}src={userWall[currentPost].firstImage}/>
            </Div>}
            {userWall[currentPost].text && <Div>
                {userWall[currentPost].text}
            </Div>}
            <Div style={{display: 'flex'}}>
                {(currentPost < userWall.length - 1) && <Button size="l" stretched style={{ marginRight: 8 }} onClick={onNext}>Next</Button>}
                {currentPost > 0 && <Button size="l" stretched level="secondary" onClick={onPrev}>Previous</Button>}
            </Div>
        </Group>)
    }
    else {
        if (!firstRun)
            return (<Group title="Empty wall"><Div>
                You have no posts with at least one attached picture on a wall. Please, add something and return!
            </Div></Group>)
        else {
            return ""
        }
    }
};

Post.propTypes = {
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    firstRun: PropTypes.bool,
    currentPost: PropTypes.number,
    userWall: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            firstImage: PropTypes.string
        })
    ),
};

export default Post