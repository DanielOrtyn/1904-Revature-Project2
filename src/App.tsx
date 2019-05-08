import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import NavComponent from './components/nav/nav.component';
import './include/bootstrap';
import { FirstComponent } from './components/first.component';
import { SecondComponent } from './components/second.component';
import { HomeComponent } from './components/home/home.component';
import SignInComponent from './components/sign-in/sign-in.component';
import { Provider } from 'react-redux';
import { store } from './Store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavComponent />
        <div id="main-content-container">
          <Switch>>
            <Route path="/first" component={FirstComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/second" component={SecondComponent} />
            <Route path="/sign-in" component={SignInComponent} />
            <Route component={HomeComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
