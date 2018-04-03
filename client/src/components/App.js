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
import {isAuthenticated, setAuthToken} from "../actions/auth";
import {fetchMatches} from "../actions/match";


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthenticated: bool => dispatch(isAuthenticated(bool)),
        setAuthToken: token => dispatch(setAuthToken(token)),
        fetchMatches: () => dispatch(fetchMatches())
    }
}

class App extends React.Component{
    componentWillMount(){
        this.props.fetchMatches();
        const token = Cookies.get('token');
        if (token !== undefined){
            this.props.setAuthenticated(true);
            this.props.setAuthToken(token);
        }
    }

    render() {
        const props = this.props;

        return(
            <BrowserRouter>
                <div style={{minHeight: '100vh' }}>
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

                    <Route exact path={'/meccsek/:id/szerkesztes'}
                           render={props => <MatchEditor  {...props} update/>}/>

                </div>
            </BrowserRouter>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);