import React from 'react';
import {Layout} from "../presentational/layout";
import {Form, Grid, Header, Button, Message} from 'semantic-ui-react';
import axios from "axios/index";

export class StatisticsEditor extends React.Component{
    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
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

            axios({
                url: '/api/matches',
                method: this.props.update ? 'put' : 'post',
                data: data,
            })
                .then( response => {
                    console.log(response);
                })
        }
    }

    render(){
        const {season, league, ageGroup, win, draw, loss, finalPosition, hasError } = this.state;
        return (
            <Layout>
                <Form>
                    <Grid centered stackable>
                        <Grid.Row>
                            <Grid.Column mobile={16}>
                                <Header content="Új statisztika rögzítése" width={16} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Form.Select
                                    label="Szezon:"
                                    id="season"
                                    placeholder='Szezon'
                                    selection
                                    value={season}
                                    onChange={this.handleSelect}
                                    options={optionGenerator(null, 2018, 1990)}
                                    fluid
                                    required />
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Form.Select
                                    label='Korosztály:'
                                    id='ageGroup'
                                    placeholder='Korosztály'
                                    selection
                                    value={ageGroup}
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
                                    placeholder='Liga'
                                    selection
                                    value={league}
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
                                    onChange={this.handleChange}
                                    required/>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Input
                                    label='Döntetlen:'
                                    id='draw'
                                    placeholder='döntetlen'
                                    value={draw}
                                    onChange={this.handleChange}
                                    required/>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Input
                                    label='Vereség:'
                                    id='loss'
                                    placeholder='vereség'
                                    value={loss}
                                    onChange={this.handleChange}
                                    required/>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Input
                                    label='Helyezés:'
                                    id='finalPosition'
                                    placeholder='helyezés'
                                    value={finalPosition}
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
                                    type='submit'
                                    color='blue'
                                    content='mentés'
                                    fluid/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
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
};