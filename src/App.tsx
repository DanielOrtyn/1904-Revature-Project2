import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import NavComponent from './components/nav/nav.component';
import './include/bootstrap';
import { HomeComponent } from './components/home/home.component';
import SignInComponent from './components/sign-in/sign-in.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import UserInfoComponent from './components/user/user.info.page.component';
import SaleItemComponent from './components/saleitem/saleitem.component';
import { SaleItemCategoryListComponent } from './components/SaleItemList/saleitem-category-list.component';
import { CreateUserInfoComponent } from './components/user/user.create.page.component';
import SignOutComponent from './components/sign-in/sign-out.component';
import EditUserInfoComponent from './components/user/user.edit.page.component';
import NewSaleCardComponent from './components/saleitem/saleitem.new.card.somponent';

const App: React.FC = () => {
    return (
        <body className="MainBackground">
            <Provider store={store}>
                <BrowserRouter>
                    <NavComponent />
                    <div id="main-content-container">
                        <Switch>
                            <Route path="/home" component={HomeComponent} />
                            <Route path="/sign-in" component={SignInComponent} />
                            <Route path="/user-info" component={UserInfoComponent} />
                            <Route path="/saleitem-List" component={SaleItemCategoryListComponent} />
                            <Route path="/create-user" component={CreateUserInfoComponent} />
                            <Route path="/sign-out" component={SignOutComponent} />
                            <Route path="/sale-page" component={SaleItemComponent} />
                            <Route path="/edit-user" component={EditUserInfoComponent} />
                            <Route path="/new-sale" component={NewSaleCardComponent} />
                            <Route component={HomeComponent} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        </body>
    );
}

export default App;
