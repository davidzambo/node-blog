import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import PostList from './containers/posts.list';
import PostShow from './containers/posts.show';
import PostEditor from './containers/posts.editor';


const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/:category(en-igy-gondolom|kezilabda|)"
        render={props => <PostList {...props}/>} />
      <Route path="/uj"
        render={props => <PostEditor />} />
      <Route path="/bejegyzesek/:slug/szerkesztes"
        render={props => <PostEditor {...props} update />} />
      <Route path={`/bejegyzesek/:slug`}
        render={props => <PostShow {...props} />} />
    </div>
  </BrowserRouter>
);

export default App;