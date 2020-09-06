import React from 'react';
import classes from './App.module.css';
import Layout from "./hoc/Layout/Layout";
import {connect} from 'react-redux';
import UnauthorizedUserMainPage from "./containers/UnauthorizedUserMainPage/UnauthorizedUserMainPage";
import { Route, Switch, Redirect } from 'react-router-dom';
import store from './store/store';
import {loadUser} from './store/actions/auth';


class App extends React.Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        let routers = (
            <Switch>
                <Route path="/"  component={UnauthorizedUserMainPage} />
                <Redirect to="/" />
            </Switch>
        );
        if(this.props.isAuthenticated){
            routers = (
                <Switch>
                    <Route path="/" component={Layout} />
                    <Redirect to="/" />
                </Switch>
            );
        }


      return (
        <div className={classes.App}>
            {routers}
        </div>
  )}
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.token !== null,
    }
);


export default connect(mapStateToProps)(App);
