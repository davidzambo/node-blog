import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import PostList from './containers/posts.list';
import PostShow from './containers/posts.show';
import PostEditor from './containers/posts.editor';


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const App = (props) => (
    <BrowserRouter>
        <div>
            <Route exact path='/oldal/:page'
                   render={ props => <PostList {... props}/>} />

            <Route exact path="/:category(en-igy-gondolom|kezilabda|)/oldal/:page"
                   render={props => <PostList {...props}/>}/>

            <Route exact path="/uj" render={ () => {
                return props.isAuthenticated ? <PostEditor /> : <Redirect to='/'/> }
            }/>
            <Route exact path="/bejegyzesek/:slug/szerkesztes"
                   render={props => <PostEditor {...props} update/>}/>
            <Route exact path={`/bejegyzesek/:slug`}
                   render={props => <PostShow {...props} />}/>
        </div>
    </BrowserRouter>
);

export default connect(mapStateToProps)(App);