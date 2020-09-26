import React, {Component} from "react";
import classes from './SearchingInput.module.css'
import {withRouter} from 'react-router-dom';


class SearchInput extends Component {
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
        let classesContainer = [classes.Searching];
        if (this.props.explore){
            classesContainer.push(classes.Explore);
        }
        return (
            <div className={classesContainer.join(' ')}>
                <input className={classes.SearchingInput}
                       value={this.state.searchingValue}
                       onChange={this.searchingHandler}
                       type="text"
                       placeholder="Search Twitter"
                        />
                <span onClick={this.searchingSubmitHandler}
                      className={classes.ArrowButton}/>
            </div>
        );
    }
}

export default withRouter(SearchInput);