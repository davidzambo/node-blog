import React, {Component} from 'react';
import Layout from '../presentational/layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Form, Header, Message, Grid, Button, Segment} from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';
import Validator from "../../libs/validators";

export class MatchEditor extends Component {
    constructor(props) {
        super(props);
        moment.locale('hu');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            id: '',
            matchDate: moment(),
            city: '',
            address: '',
            team: 'ENUSE',
            vsTeam: '',
            league: '',
            ageGroup: ''
        }
    }

    async componentWillMount(){
        const id = this.props.match.params.id;
        if (this.props.update){
            const response = await axios.get(`/api/matches/${id}`);
            const match = response.data.match;
            match.matchDate = moment(match.matchDate);
            this.setState({
                _id: match._id,
                matchDate: match.matchDate,
                city: match.city,
                address: match.address,
                team: match.team,
                vsTeam: match.vsTeam,
                league: "" + match.league,
                ageGroup: match.ageGroup
            });
        }
    }

    handleChange(event) {
        if (event.hasOwnProperty('target')) {
            this.setState({[event.target.id]: event.target.value});
        } else {
            this.setState({matchDate: event});
        }
    }

    handleSelect(event, select) {
        this.setState({
            [select.id]: select.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let isAllFilled = true;
        for (let prop in this.state) {
            if (this.state.hasOwnProperty(prop)) {
                if (prop !== 'address' && prop !== 'matchDate' && prop !== 'id' && this.state[prop] === ''){
                    isAllFilled = false;
                    break;
                }
            }
        }
        if (!isAllFilled) {
            this.setState({
                hasError: true
            });
        } else {
            const data = Object.assign({}, this.state);
            data.matchDate = this.state.matchDate._d;

            axios({
                url: '/api/matches',
                method: this.props.update ? 'put' : 'post',
                data: data,
            })
                .then( response => {
                    if (response.status === 200 || response.status === 201)
                        window.location = '/meccsek';
                        // console.log(response);
                }).catch(err => {
                    console.error(err);
            })
        }
    }

    render() {
        const {matchDate, city, address, team, vsTeam, league, ageGroup, hasError} = this.state;
        return (
            <Layout>
                <Segment>
                    <Form onSubmit={this.handleSubmit} error>
                        <Grid centered stackable>
                            <Grid.Row>
                                <Grid.Column mobile={16}>
                                    <Header content='Új meccs rögzítése' width={16}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <Form.Input
                                        label='Csapat neve:'
                                        placeholder='pl. ENUSE'
                                        id='team'
                                        value={team}
                                        error={!Validator.isPostTitle(team)}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <Form.Input
                                        label='Ellenfél neve:'
                                        placeholder='pl. DVTK'
                                        id='vsTeam'
                                        value={vsTeam}
                                        error={!Validator.isPostTitle(vsTeam)}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column mobile={16} tablet={6} computer={6}>
                                    <Form.Input
                                        label='Város:'
                                        id='city'
                                        placeholder='pl.: Budapest'
                                        value={city}
                                        error={!Validator.isPostTitle(city)}
                                        onChange={this.handleChange}
                                        required/>
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={10} computer={10}>
                                    <Form.Input
                                        label='Pontos cím:'
                                        id='address'
                                        placeholder='pl.: Lajosmizsei út 23.'
                                        value={address}
                                        onChange={this.handleChange} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Form.Select
                                        label='Korosztály:'
                                        id='ageGroup'
                                        placeholder='Korosztály'
                                        selection
                                        value={ageGroup}
                                        error={ageGroup === ''}
                                        onChange={this.handleSelect}
                                        options={optionGenerator({key: 'felnőtt', value: 'felnőtt', text: 'felnőtt' }, 21, 5, 'U', )}
                                        fluid
                                        required
                                    />
                                </Grid.Column>
                                <Grid.Column width={8} >
                                    <Form.Select
                                        label='Liga:'
                                        id='league'
                                        placeholder='Liga'
                                        value={league}
                                        error={league === ''}
                                        onChange={this.handleSelect}
                                        options={optionGenerator(null, 1, 7)}
                                        fluid
                                        required
                                    />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column mobile={16} className='field'>
                                    <div className='field'>
                                        <label htmlFor="date">Meccs időpontja:</label>
                                        <DatePicker
                                            id='date'
                                            selected={matchDate}
                                            showTimeSelect={true}
                                            onChange={this.handleChange}
                                            dateFormat='YYYY. MMMM D. HH:mm'
                                            timeFormat='HH:mm'
                                            minDate={moment()}
                                            maxDate={moment().add(1, 'year')}
                                            showDisabledMonthNavigation
                                            locale='hu-hu'
                                            inline
                                        />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    {
                                        hasError ? <Message
                                                negative
                                                icon='exclamation triangle'
                                                header='Whoopsz :O'
                                                content='Kérem ellenőrizze, hogy minden mezőt kitöltött-e!'/>
                                            : ''
                                    }
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Button
                                        type='submit'
                                        color='blue'
                                        icon='add'
                                        labelPosition='left'
                                        content='mentés'/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Segment>
            </Layout>
        );
    }
}

const optionGenerator = (initial, from, to, prefix) => {
    const result = [{key: '', value: '', text: 'Kérem válasszon!'}];

    if (initial !== null)
        result.push(initial);

    let option = {};

    if (prefix === undefined)
        prefix = '';

    if (from > to) {
        for (let i = from; i >= to; i--) {
            option = {
                key: `${prefix}${i}`,
                value: `${prefix}${i}`,
                text: `${prefix}${i}`
            };
            result.push(option);
        }
    } else {
        for (let i = from; i <= to; i++) {
            option = {
                key: `${prefix}${i}`,
                value: `${prefix}${i}`,
                text: `${prefix}${i}`
            };
            result.push(option);
        }
    }

    return result;
}