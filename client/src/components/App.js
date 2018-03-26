import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import PostList from './containers/posts.list';
import PostShow from './containers/posts.show';
import PostEditor from './containers/posts.editor';
import {MatchEditor} from "./containers/match.editor";
import MatchList from './containers/match.list';
import Cookies from 'js-cookie';
import axios from 'axios';
import {isAuthenticated, setAuthToken} from "../actions/auth";


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthenticated: bool => dispatch(isAuthenticated(bool)),
        setAuthToken: token => dispatch(setAuthToken(token)),
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        const token = Cookies.get('token');
        console.log(token);
        if (token !== undefined){
            this.props.setAuthenticated(true);
            this.props.setAuthToken(token);
        }
    }

    render() {
        const props = this.props;

        return(
            <BrowserRouter>
                <div>
                    <Route exact path='/'
                           render={props => <PostList {...props}/>}/>

                    <Route exact path="/:category(en-igy-gondolom|kezilabda)"
                           render={props => <PostList {...props}/>}/>

                    <Route exact path="/uj" render={() => {
                        return props.isAuthenticated ? <PostEditor/> : <Redirect to='/'/>
                    }}/>
                    <Route exact path="/bejegyzesek/:slug/szerkesztes"
                           render={props => <PostEditor {...props} update/>}/>

                    <Route exact path={`/bejegyzesek/:slug`}
                           render={props => <PostShow {...props} />}/>

                    <Route exact path={'/meccsek/uj'}
                           render={props => <MatchEditor {...props} />}/>

                    <Route exact path={'/meccsek'}
                           render={props => <MatchList  {...props} />}/>
                </div>
            </BrowserRouter>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);