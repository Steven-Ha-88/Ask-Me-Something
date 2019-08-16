import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import ForumDelete from './components/forum/ForumDelete';
import ForumCreate from './components/forum/ForumCreate';
import ForumEdit from './components/forum/ForumEdit';
import ForumDisplay from './components/forum/ForumDisplay';
import Header from './components/navbar/Header';
import history from './history';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';


const App = () => (
  <div>
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/forum/new" exact component={ForumCreate} />
          <Route path="/forum/edit/:id" exact component={ForumEdit} />
          <Route path="/forum/delete/:id" exact component={ForumDelete} />
          <Route path="/forum/:id" exact component={ForumDisplay} />
        </Switch>
      </div>
    </Router>
  </div>
);


export default App;
