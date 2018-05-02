import React from 'react';
import Layout from "../presentational/layout";
import {Form, Grid, Header, Button, Message, Segment} from 'semantic-ui-react';
import axios from "axios/index";
import Validator from "../../libs/validators";

export class StatisticsEditor extends React.Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            _id: '',
            team: 'ENUSE',
            season: '',
            league: '',
            ageGroup: '',
            win: '',
            draw: '',
            loss: '',
            finalPosition: '',
            hasError: false,
        };

    }

    componentWillMount(){
        if (this.props.update) {
            axios.get(`/api/statistics/${this.props.match.params.id}`)
                .then( response => {
                    const s = response.data.statistics;
                    console.log(s);
                    this.setState({
                        _id: s._id,
                        team: s.team,
                        season: s.season,
                        league: "" + s.league,
                        ageGroup: s.ageGroup,
                        win: s.win,
                        draw: s.draw,
                        loss: s.loss,
                        finalPosition: s.finalPosition,
                    });
                })
        }
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSelect(event, select){
        this.setState({
            [select.id]: select.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let isAllFilled = true;
        for (let prop in this.state) {
            if (this.state.hasOwnProperty(prop)) {
                if (prop !== 'hasError' && prop !== '_id' && this.state[prop] === ''){
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
            delete data.hasError;

            if (!this.props.update){
                delete data._id;
            }

            axios({
                url: '/api/statistics',
                method: this.props.update ? 'put' : 'post',
                data: data,
            })
                .then( response => {
                    if (response.status === 200)
                        window.history.back();
                });
        }
    }

    render(){
        const {team, season, league, ageGroup, win, draw, loss, finalPosition, hasError } = this.state;
        return (
            <Layout>
                <Segment>
                    <Form onSubmit={this.handleSubmit} error>
                        <Grid centered stackable>
                            <Grid.Row>
                                <Grid.Column mobile={16}>
                                    <Header content={this.props.update ? "Statisztika frissítése" : "Új statisztika rögzítése"} width={16} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Form.Input
                                        label="Csapat neve:"
                                        placeholder="pl. ENUSE"
                                        id="team"
                                        value={team}
                                        error={!Validator.isPostTitle(team)}
                                        onChange={this.handleChange}
                                        required />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Form.Select
                                        label="Szezon:"
                                        id="season"
                                        placeholder='Kérem válasszon!'
                                        selection
                                        value={season}
                                        error={season === ''}
                                        onChange={this.handleSelect}
                                        options={optionGenerator(null, Number(new Date().getFullYear()), 1990, 'seasons')}
                                        fluid
                                        required />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Form.Select
                                        label='Korosztály:'
                                        id='ageGroup'
                                        placeholder='Kérem válasszon!'
                                        selection
                                        value={ageGroup}
                                        error={ageGroup === ''}
                                        onChange={this.handleSelect}
                                        options={optionGenerator({key: 'felnőtt', value: 'felnőtt', text: 'felnőtt' }, 21, 5, 'U', )}
                                        fluid
                                        required
                                    />
                                </Grid.Column>
                                <Grid.Column width={5} >
                                    <Form.Select
                                        label='Liga:'
                                        id='league'
                                        placeholder='Kérem válasszon!'
                                        selection
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
                                <Grid.Column width={4}>
                                    <Form.Input
                                        label='Győzelem:'
                                        id='win'
                                        placeholder='győzelem'
                                        value={win}
                                        error={!Validator.isNumber(win)}
                                        onChange={this.handleChange}
                                        required/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Form.Input
                                        label='Döntetlen:'
                                        id='draw'
                                        placeholder='döntetlen'
                                        value={draw}
                                        error={!Validator.isNumber(draw)}
                                        onChange={this.handleChange}
                                        required/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Form.Input
                                        label='Vereség:'
                                        id='loss'
                                        placeholder='vereség'
                                        value={loss}
                                        error={!Validator.isNumber(loss)}
                                        onChange={this.handleChange}
                                        required/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Form.Input
                                        label='Helyezés:'
                                        id='finalPosition'
                                        placeholder='helyezés'
                                        value={finalPosition}
                                        error={!Validator.isNumber(finalPosition)}
                                        onChange={this.handleChange}
                                        required/>
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
                                        icon='save'
                                        labelPosition='left'
                                        type='submit'
                                        color='blue'
                                        content={this.props.update ? 'frissítés' : 'mentés'}
                                        floated="left"/>
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
            if (prefix === 'seasons'){
                option = {
                    key: `${i}/${i+1}`,
                    value: `${i}/${i+1}`,
                    text: `${i}/${i+1}`
                };
            } else {
                option = {
                    key: `${prefix}${i}`,
                    value: `${prefix}${i}`,
                    text: `${prefix}${i}`
                };
            }
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
};