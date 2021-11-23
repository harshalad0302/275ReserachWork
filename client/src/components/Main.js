import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage.js';
import Login from '../components/Login/Login.js';
import SignUP from '../components/SignUP/SignUp.js';
import Dashboard from '../components/Dashboard/Dashboard.js';


class Main extends Component {
    render() {
        return (
            <div>
            <BrowserRouter>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUP} />
                <Route exact path="/dashboard" component={Dashboard} />
            </BrowserRouter>
            </div>
        )
    }
}
export default Main;