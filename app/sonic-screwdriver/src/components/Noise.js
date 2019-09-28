import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Button, Div, Avatar, PanelHeader } from '@vkontakte/vkui';


const Noise = ({currentNoises, onShare}) => {
    if (currentNoises.length > 0) {
        return (<Group title="Recommended ambient">
            {currentNoises.map(currentNoise => (<ListItem
                before=<Avatar type="image" src={currentNoise.image}/>
                description={currentNoise.text}
            >
                {currentNoise.title}
            </ListItem>))}
            <Div>
                <Button size="xl" level="secondary" onClick={onShare}>Share</Button>
            </Div>
        </Group>)
    }
    else {
        return ""
    }
};

Noise.propTypes = {
    onShare: PropTypes.func,
    currentNoises: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            image: PropTypes.string,
            text: PropTypes.string,
        })
    )
};

export default Noise