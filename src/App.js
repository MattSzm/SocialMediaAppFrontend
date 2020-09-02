import React from 'react';
import classes from './App.module.css';
import Layout from "./hoc/Layout/Layout";
import {connect} from 'react-redux';
import UnauthorizedUserMainPage from "./containers/UnauthorizedUserMainPage/UnauthorizedUserMainPage";

class App extends React.Component {

    render() {
      return (
        <div className={classes.App}>
            {this.props.isAuthenticated ?
                <Layout /> : <UnauthorizedUserMainPage />}
        </div>
  )}
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.token !== null
    }
);


export default connect(mapStateToProps)(App);
