import React, {Component} from "react";
import classes from './Info.module.css';


class Info extends Component{
    state = {
        searchingValue: ''
    }

    searchingHandler = (event) => {
        this.setState({
            searchingValue: event.target.value
        });
    }

    render() {
        return (
            <div className={classes.InfoContainer}>
                <div className={classes.Info}>
                    <div className={classes.Searching}>
                        <input  className={classes.SearchingInput}
                                value={this.state.searchingValue}
                                onChange={this.searchingHandler}
                                type="text"
                                placeholder="Search Twitter"/>
                    </div>
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

export default Info;