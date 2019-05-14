import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import NavComponent from './components/nav/nav.component';
import './include/bootstrap';
import { HomeComponent } from './components/home/home.component';
import SignInComponent from './components/sign-in/sign-in.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import { UserInfoComponent } from './components/user/user.info.page.component';
import { SaleItemComponent } from './components/saleitem/saleitem.component';
// import { SaleItemCategoryListComponent } from './components/SaleItemList/saleitem-category-list.component';
import { CreateUserInfoComponent } from './components/user/user.create.page.component';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavComponent />
        <div id="main-content-container">
          <Switch>>
            <Route path="/home" component={HomeComponent} />
            <Route path="/sign-in" component={SignInComponent} />
            <Route path="/user-info" component={UserInfoComponent}/>
            <Route path="/saleitemtest" component={SaleItemComponent}/>
            {/* <Route path="/saleitemList" component={SaleItemCategoryListComponent}/> */}
            <Route path="/create-user" component={CreateUserInfoComponent}/>
            <Route component={HomeComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
