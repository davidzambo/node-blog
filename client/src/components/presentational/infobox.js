import React from 'react';
import {Segment, Icon, List, Label, Divider} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

class Infobox extends React.Component {
    render() {
        return (
            <Segment>
                <Label color='red' ribbon size="large">
                    <Icon name="info"/>Információk
                </Label>
                <List className="standard-link">
                    <List.Item>
                        <NavLink to="/adatvedelmi-nyilatkozat">
                            <Icon name="paragraph"/>Adatvédelmi nyilatkozat
                        </NavLink>
                    </List.Item>
                    <List.Item>
                        <NavLink to="/leiratkozas">
                            <Icon name="cancel"/>Hírlevél leiratkozás
                        </NavLink>
                    </List.Item>
                    <List.Item>
                        <NavLink to="/impresszum">
                            <Icon name="info"/>Impresszum
                        </NavLink>
                    </List.Item>
                    <Divider/>
                    <List.Item style={{textAlign: 'center'}}>
                        <NavLink to="https://www.dcmf.hu">
                            <Label as='a' color='black' icon>
                                <Icon name="code"/>
                                codedBy:
                                <Label.Detail style={{backgroundColor: 'red'}}>DCMF</Label.Detail>
                            </Label>
                        </NavLink>
                    </List.Item>
                </List>
            </Segment>
        );
    }
}

export default Infobox;