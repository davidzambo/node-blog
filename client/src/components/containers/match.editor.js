import React, {Component} from 'react';
import Layout from '../presentational/layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Form, Header, Message, Grid, Dropdown} from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';

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

    handleChange(event, value) {
        if (event.hasOwnProperty('target')) {
            this.setState({[event.target.id]: event.target.value});
        } else {
            this.setState({matchDate: event});
        }
        console.log(this.state);
    }

    handleSelect(event, select) {
        this.setState({
            [select.id]: select.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let isAllFilled = true;
        for (let prop in this.state) {
            if (this.state.hasOwnProperty(prop)) {
                if (prop !== 'address' && prop !== 'matchDate' && prop !== 'id' && this.state[prop] === '')
                    isAllFilled = false;
            }
        }
        if (!isAllFilled) {
            this.setState({
                hasError: true
            });
        } else {
            const data = Object.assign({}, this.state);
            data.matchDate = this.state.matchDate._d;
            axios.post('/api/matches', data)
                .then( response => {
                    console.log(response);
                })
            // console.log(this.state);
            // console.log(isAllFilled);
        }

    }

    render() {
        const {matchDate, city, address, team, vsTeam, league, ageGroup, hasError} = this.state;
        return (
            <Layout>
                <Form onSubmit={this.handleSubmit}>
                    <Grid centered stackable>
                        <Grid.Row>
                            <Grid.Column mobile={16}>
                                <Header content ='Új meccs rögzítése' width={16}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                <Form.Input
                                    label='Csapat neve:'
                                    placeholder='pl. ENUSE'
                                    id='team'
                                    value={team}
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
                            <Grid.Column mobile={16} tablet={6} computer={6} className='field'>
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
                                    fixedHeigth
                                />
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={5} computer={5}>
                                <Form.Select
                                    label='Korosztály:'
                                    id='ageGroup'
                                    placeholder='Korosztály'
                                    selection
                                    value={ageGroup}
                                    onChange={this.handleSelect}
                                    options={optionGenerator(21, 5, 'U')}
                                    fluid
                                    required
                                />
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={5} computer={5}>
                                <Form.Select
                                    label='Liga:'
                                    id='league'
                                    placeholder='Liga'
                                    value={league}
                                    onChange={this.handleSelect}
                                    options={optionGenerator(7, 1)}
                                    fluid
                                    required
                                />
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
                            <Form.Button
                                type='submit'
                                color='blue'
                                content='mentés'/>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Layout>
        );
    }
}

const optionGenerator = (from, to, prefix) => {
    const result = [{key: '', value: '', text: 'Kérem válasszon!'}];

    let option = {};

    if (prefix === undefined)
        prefix = '';

    for (let i = from; i >= to; i--) {
        option = {
            key: `${prefix}${i}`,
            value: `${prefix}${i}`,
            text: `${prefix}${i}`
        };
        result.push(option);
    }
    return result;
}