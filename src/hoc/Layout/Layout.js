import React from "react";
import classes from './Layout.module.css';
import SideDrawer from "../../containers/SideDrawer/SideDrawer";
import NewsFeed from "../../containers/Posts/NewsFeed/NewsFeed";
import Info from "../../containers/Info/Info";
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserPage from "../../containers/Posts/UserPage/UserPage";
import CurrentUser from "../../containers/Posts/UserPage/CurrentUser/CurrentUser";
import Comments from "../../containers/Comments/Comments";


class Layout extends React.Component{

    render() {
        return(
            <div className={classes.Layout}>
                <SideDrawer/>

                <Switch>
                    {this.props.currentUser ?
                        <Redirect from={`/user/${this.props.currentUser.username}`} to="/profile" /> : null }
                    <Route path="/user/:username" exact component={UserPage} />
                    <Route path="/tweet/:postUuid" exact component={Comments} />
                    <Route path="/profile" exact component={CurrentUser}/>

                    <Route path="/" component={NewsFeed} />
                </Switch>

                <Info />
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        currentUser: state.auth.user,
    }
);

export default connect(mapStateToProps)(Layout);