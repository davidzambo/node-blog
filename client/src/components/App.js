import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Editor from './Editor';
import Articles from './Articles';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Articles} />
          <Route exact path="/article/create" component={Editor} />
          <Route exact path="/articles" component={Articles} />
        </div>
      </Router>
    );
  }
}

export default App;