import React from 'react';
import {Header, Icon, Segment, Divider} from 'semantic-ui-react';
import Layout from './layout';

export default class LegalNotice extends React.Component {
    render() {
        return (
            <Layout>
                <Segment>
                    <Header dividing>
                        <Header.Content>
                            <Icon name="id badge" color="green"/>
                            Rólam
                        </Header.Content>
                    </Header>
                    <Divider horizontal/>
                    Hamarosan...
                </Segment>
            </Layout>
        )
    }
}