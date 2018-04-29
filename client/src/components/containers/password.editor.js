import React from 'react';
import {Divider, Form, Header, Icon, Message, Segment} from 'semantic-ui-react';
import Layout from '../presentational/layout';
import Validator from '../../libs/validators';
import axios from 'axios';
import {connect} from 'react-redux';
import {isAuthenticated, setAuthToken} from "../../actions/auth";
import Cookies from 'js-cookie';

const mapDispatchToProps = dispatch => {
    return {
        setAuthenticated: bool => dispatch(isAuthenticated(bool)),
        setAuthToken: token => dispatch(setAuthToken(token)),
    }
}

class PasswordEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: ''
        }
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault();

        const {oldPassword, newPassword, newPasswordConfirm} = this.state;

        const valid = Validator.isPassword(oldPassword) && Validator.isPassword(newPassword) && Validator.isPassword(this.state.newPasswordConfirm) && (newPassword === newPasswordConfirm);
        if (valid) {
            try {
                const response = await axios.put('/api/user', this.state, {withCredentials: true});
                switch (response.status) {
                    case 206:
                        this.setState({
                            result: <Message icon="exclamation triangle" negative header={response.data.message}/>
                        });
                        break;
                    case 202:
                        Cookies.remove('trdToken');
                        this.props.setAuthenticated(false);
                        break;
                    default:
                        this.setState({
                            result: <Message icon="exclamation triangle" negative
                                             header="A mentés során hiba történt."/>
                        });
                        break;
                }
            } catch (e){
                console.log(e);
                this.setState({
                    result: <Message icon="exclamation triangle" negative
                                     header={e.response.data.message}/>
                });
            }


        }
    }

    render() {
        const {oldPassword, newPassword, newPasswordConfirm} = this.state;
        return (
            <Layout>
                <Segment>
                    <Header dividing>
                        <Header.Content>
                            <Icon name="key" color="red"/>
                            Új jelszó beállítása
                        </Header.Content>
                    </Header>
                    <Divider horizontal/>
                    <Form error onSubmit={this.handleSubmit}>
                        <Form.Input
                            id="oldPassword"
                            value={oldPassword}
                            onChange={this.handleChange}
                            label="Régi jelszó"
                            required
                            type="password"
                        />
                        <Form.Input
                            id="newPassword"
                            value={newPassword}
                            error={!Validator.isPassword(newPassword)}
                            onChange={this.handleChange}
                            label="Új jelszó"
                            required
                            type="password"
                        />
                        <Form.Input
                            id="newPasswordConfirm"
                            value={newPasswordConfirm}
                            onChange={this.handleChange}
                            error={newPassword !== newPasswordConfirm}
                            label="Új jelszó megerősítése"
                            required
                            type="password"
                        />
                        {this.state.result}
                        <Form.Button
                            type="submit"
                            icon="refresh"
                            color="blue"
                            content="frissítés"/>
                    </Form>
                </Segment>
            </Layout>
        )
    }
}

export default connect(null, mapDispatchToProps)(PasswordEditor);