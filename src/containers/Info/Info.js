import React, {Component} from "react";
import classes from './Info.module.css';
import SearchInput from "../../components/UI/Input/SearchingInput/SearchingInput";
import {withRouter} from 'react-router-dom';

class Info extends Component{
    state = {
        searchingValue: ''
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
        return (
            <div className={classes.InfoContainer}>
                <div className={classes.Info}>
                    <SearchInput  value={this.state.searchingValue}
                                  onChangeValue={this.searchingHandler}
                                  submitHandler={this.searchingSubmitHandler}/>
                    <ul>
                        <li>SEARCHING</li>
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

export default withRouter(Info);