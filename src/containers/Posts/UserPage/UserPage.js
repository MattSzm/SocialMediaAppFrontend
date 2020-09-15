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
        let userDetail = <UserDetail loading={true} />;
        if(this.props.user){
            userDetail = (
                        <UserDetail
                            user={this.props.user}
                        />
            );
        }
        return(
            <div className={classes.UserPage}>
                {userDetail}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.pickedUser
});

const mapDispatchToProps = dispatch => ({
    loadUser: (username) => dispatch(fetchUser(username, true))
});


export default connect(mapStateToProps, mapDispatchToProps)(UserPage);