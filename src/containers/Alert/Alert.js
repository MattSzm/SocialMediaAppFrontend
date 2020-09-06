import React, {Component, Fragment} from "react";
import {withAlert} from "react-alert";


class Alert extends Component{
    componentDidMount() {
        this.props.alert.show('IT works');
    }

    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

export default withAlert()(Alert);