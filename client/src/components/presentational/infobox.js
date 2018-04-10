import React from 'react';
import {Menu, Icon} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

class Infobox extends React.Component {
    render() {
        console.log(this.props.dates);
        return (
            <Menu fluid borderless vertical>
                <Menu.Item as={NavLink} to="/"><Icon name="home"/>Kezdőlap</Menu.Item>
                <Menu.Item as={NavLink} to="/rolam" icon="home" content="Rólam"/>
                <Menu.Item as={NavLink} to="/statisztika" icon="line chart" content="Statisztika"/>
                <Menu.Item as={NavLink} to="/galeria" icon="line chart" content="Galéria"/>
                <Menu.Item as={NavLink} to="/impresszum" icon="home" content="Impresszum"/>
            </Menu>
        );
    }
}

export default Infobox;