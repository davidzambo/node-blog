import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import PostList from './containers/posts.list';
import PostShow from './containers/posts.show';
import PostEditor from './containers/posts.editor';
import {MatchEditor} from "./containers/match.editor";
import MatchList from './containers/match.list';
import Cookies from 'js-cookie';
import {isAuthenticated, setAuthToken} from "../actions/auth";
import {fetchMatches} from "../actions/match";
import {StatisticsEditor} from "./containers/statistics.editor";
import StatisticsList from "./containers/statistics.list";
import {fetchArchives} from "../actions/posts";
import GalleryList from "./containers/gallery.list";
import GalleryEditor from "./containers/gallery.editor";
import LegalNotice from "./presentational/legal-notice";
import AboutMe from "./presentational/about-me";
import Impressum from "./presentational/impressum";
import NewsLetterConfirm from "./presentational/NewsLetter/confirm";
import NotFound from "./presentational/not-found";
import PasswordEditor from "./containers/password.editor";
import Unsubscribe from "./presentational/unsubscribe";

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        archive: state.posts.archives
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthenticated: bool => dispatch(isAuthenticated(bool)),
        setAuthToken: token => dispatch(setAuthToken(token)),
        fetchMatches: () => dispatch(fetchMatches()),
        fetchArchives: () => dispatch(fetchArchives())
    }
}

class App extends React.Component{
    async componentWillMount(){
        this.props.fetchMatches();
        const token = Cookies.get('trdToken');
        if (token !== undefined){
            this.props.setAuthenticated(true);
            this.props.setAuthToken(token);
        }
        await this.props.fetchArchives();
    }

    render() {
        return(
            <BrowserRouter>
                <div style={{minHeight: '100vh' }}>
                    <Switch>
                    <Route exact path='/'
                           render={props => <PostList {...props}/>}/>

                    <Route exact path="/:category(en-igy-gondolom|kezilabda)"
                           render={props => <PostList {...props}/>}/>

                    <Route exact path="/bejegyzesek/uj"
                           render={(props) => {
                               return this.props.isAuthenticated ? <PostEditor/> : <Redirect to='/'/>
                           }}/>

                    <Route exact path="/bejegyzesek/:slug/szerkesztes"
                           render={props => {
                               return this.props.isAuthenticated ? <PostEditor {...props} update/> : <Redirect to='/'/>
                           }}/>

                    <Route exact path={`/bejegyzesek/:slug`}
                           render={props => <PostShow {...props} />}/>

                    <Route exact path={'/meccsek/uj'}
                           render={props => {
                               return this.props.isAuthenticated ? <MatchEditor {...props} /> : <Redirect to='/'/>
                           }}/>

                    <Route exact path={'/meccsek'}
                           render={props => <MatchList  {...props} />}/>

                    <Route exact path={'/meccsek/:id/szerkesztes'}
                           render={props => {
                               return this.props.isAuthenticated ? <MatchEditor  {...props} update/> : <Redirect to='/'/>
                           }}/>

                    <Route exact path={'/statisztika/uj'}
                           render={props => {
                               return this.props.isAuthenticated ? <StatisticsEditor {...props} /> : <Redirect to='/'/>
                           }}/>

                    <Route exact path={'/statisztika/'}
                           render={() => <StatisticsList/>}/>

                    <Route exact path={'/statisztika/:id/szerkesztes'}
                           render={props => {
                               return this.props.isAuthenticated ? <StatisticsEditor {...props} update/> : <Redirect to='/'/>
                           }}/>

                    <Route exact path={'/archivum/:year/:month'}
                           render={props => <PostList {...props} archive/>}/>

                    <Route exact path={'/galeria/'}
                           render={() => <GalleryList />} />

                    <Route exact path={'/galeria/:slug/szerkesztes'}
                           render={props => <GalleryEditor {...props} />} />

                    <Route exact path={'/adatvedelmi-nyilatkozat'} component={LegalNotice}/>
                    <Route exact path={'/impresszum'} component={Impressum}/>
                    <Route exact path={'/rolam'} component={AboutMe}/>
                    <Route exact path={'/feliratkozas'}
                           render={props => <NewsLetterConfirm {...props}/>}/>

                    <Route exact path={'/leiratkozas'} component={Unsubscribe}/>

                    <Route exact path={'/uj-jelszo'}
                       render={(props) => {
                           return this.props.isAuthenticated ? <PasswordEditor/> : <Redirect to="/" />
                       }}/>
                    <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);