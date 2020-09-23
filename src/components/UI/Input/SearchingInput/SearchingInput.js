import React from "react";
import classes from './SearchingInput.module.css'


const searchInput = (props) => {
    return (
        <div className={classes.Searching}>
            <input  className={classes.SearchingInput}
                    value={props.value}
                    onChange={props.onChangeValue}
                    type="text"
                    placeholder="Search Twitter"/>
            <span onClick={props.submitHandler}
                className={classes.ArrowButton} />
        </div>
    );
}

export default searchInput;