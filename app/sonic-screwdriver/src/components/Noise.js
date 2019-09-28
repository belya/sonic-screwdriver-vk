import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Group, Button, Div, Avatar, PanelHeader } from '@vkontakte/vkui';


const Noise = ({currentNoises, currentNoiseIndex, onShare, onCurrentNoiseChange}) => {
    if (currentNoises.length > 0) {
        return (<Group title="Recommended ambient">
            {currentNoises.map((currentNoise, index) => (<ListItem
                before=<Avatar type="image" src={currentNoise.image}/>
                description={currentNoise.text}
                key={currentNoise.id}
                onClick={() => onCurrentNoiseChange(index)}
                style={index == currentNoiseIndex ? {'background': "rgba(0,57,115,0.1)"} : null}
            >
                {currentNoise.title}
            </ListItem>))}
            {currentNoiseIndex !== null && <Div>
                <Button size="xl" level="secondary" onClick={onShare}>Share</Button>
            </Div>}
        </Group>)
    } else {
        return ""
    }
};

Noise.propTypes = {
    onShare: PropTypes.func,
    onCurrentNoiseChange: PropTypes.func,
    currentNoises: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            image: PropTypes.string,
            text: PropTypes.string,
        })
    )
};

export default Noise