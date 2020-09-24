import React, {Component} from "react";
import classes from './Info.module.css';
import SearchInput from "../../components/UI/Input/SearchingInput/SearchingInput";
import {withRouter} from 'react-router-dom';
import {loadPopularUsers} from '../../store/actions/info';
import {connect} from 'react-redux';
import UserItemFollow from "../../components/UserDetail/UserItemFollow/UserItemFollow";


class Info extends Component{
    state = {
        searchingValue: ''
    }

    componentDidMount() {
        this.props.loadPopularUsers()
    }

    searchingHandler = (event) => {
        this.setState({
            searchingValue: event.target.value
        });
    }

     replaceAllChars(string, search, replace) {
        return string.split(search).join(replace);
    }

    transformSearchingPhrase = () => {
        let transformedPhrase = this.state.searchingValue.slice();
        transformedPhrase = this.replaceAllChars(transformedPhrase, '#', ' ');
        transformedPhrase = this.replaceAllChars(transformedPhrase, '@', ' ');
        transformedPhrase = this.replaceAllChars(transformedPhrase, '?', ' ');
        transformedPhrase = this.replaceAllChars(transformedPhrase, '/', ' ');
        return transformedPhrase;
    }

    searchingSubmitHandler = (event) => {
        event.preventDefault();
        this.props.history.push(`/explore/${this.transformSearchingPhrase()}/tweets`);
    }

    render() {
        let usersContent =  <div className={classes.LoadingBlock}/>
        if(this.props.popularUsers){
            usersContent = this.props.popularUsers.map(singleUser => (
               <UserItemFollow
                   key={singleUser.id}
                   username={singleUser.username}
                   usernameDisplayed={singleUser.username_displayed}
                   image={singleUser.photo}
                   worksAsInfo={true}/>)
            )}
        return (
            <div className={classes.InfoContainer}>
                <div className={classes.Info}>
                    <SearchInput  value={this.state.searchingValue}
                                  onChangeValue={this.searchingHandler}
                                  submitHandler={this.searchingSubmitHandler}/>
                    <ul>
                        <div className={classes.PopularUsers}>
                            <h3>Popular Users</h3>
                            <div className={classes.UserList}>
                                {usersContent}
                            </div>
                        </div>


                        <li>SEARCHING</li><li>SEARCHING</li><li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li><li>SEARCHING</li>
                        <li>SEARCHING</li>
                        <li>SEARCHING</li>




                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    popularUsers: state.info.users
});

const mapDispatchToProps = dispatch => ({
    loadPopularUsers: () => dispatch(loadPopularUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Info));