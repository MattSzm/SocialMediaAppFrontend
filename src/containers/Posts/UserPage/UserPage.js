import React, {Component} from "react";
import classes from './UserPage.module.css'
import {connect} from 'react-redux';
import {fetchUser} from "../../../store/actions/users";
import UserDetail from "../../../components/UserDetail/UserDetail";


class UserPage extends Component{
    componentDidMount() {
        const username = this.props.match.params.username;
        this.props.loadUser(username);
    }


    render() {
        return(
            <div className={classes.UserPage}>
                {this.props.user ? (
                    <UserDetail
                        user={this.props.user}
                    />) :
                    null}


            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.pickedUser
});

const mapDispatchToProps = dispatch => ({
    loadUser: (username) => dispatch(fetchUser(username))
});


export default connect(mapStateToProps, mapDispatchToProps)(UserPage);