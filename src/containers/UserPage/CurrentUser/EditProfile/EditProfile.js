import React, {Component} from "react";
import classes from './EditProfile.module.css';
import {connect} from 'react-redux';
import Input from "../../../../components/UI/Input/Input";
import UploadImages from "../../../../components/NavigationsCreatePost/UploadImages/UploadImages";
import {createError} from "../../../../store/actions/messages";
import {userEdit} from "../../../../store/actions/auth";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Button from "../../../../components/UI/StandardButton/StandardButton";


class EditProfile extends Component {
    // scalability to work with many arguments

    state = {
        controls: {
            usernameDisplayed: {
                elementType: 'input',
                label: 'Your username',
                elementConfig: {
                    type: 'text',
                    placeholder: ``
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 21
                },
                valid: true,
                touched: true
            }
        },
        pictures: [],
    }
    componentDidMount() {
        if(this.props.currentUser){
            this.setInitialValues()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((!prevProps.currentUser && this.props.currentUser)
            || (!prevProps.show && this.props.show)){
            this.setInitialValues()
        }
    }

    setInitialValues = () => {
        let picturesObject = [];
        if (this.props.currentUser.photo){
            picturesObject.push({
                data_url: this.props.currentUser.photo,
                file: this.props.currentUser.photo});
        }

        this.setState({controls:{
            ...this.state.controls,
                usernameDisplayed:{
                    ...this.state.controls.usernameDisplayed,
                    value: this.props.currentUser.username_displayed,
                    valid: true,
                    touched: true
                }
            },
            pictures: picturesObject
        });
    }

    pictureUploadHandler = (picturesList) => {
        this.setState({pictures: picturesList});;
    }

    checkValidity(value, rules){
        let isValid = true;
        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }
            if (rules.maxLength) {
                isValid = value.length < rules.maxLength && isValid;
            }
        }
        return isValid;
    }

    checkFormValidity = () => {
        let valid = true;
        const keys = Object.keys(this.state.controls);
        for(let control of keys){
            valid = valid && this.state.controls[control].valid;
        }
        return valid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,
                    this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(!this.checkFormValidity()){
            this.props.createError('badCreditsEditProfile',
                                    'Fields filled in incorrectly')
        }
        else {
            const formData = new FormData()
            formData.append('username_displayed',
                this.state.controls.usernameDisplayed.value);
            if(this.state.pictures[0] &&
                this.state.pictures[0].file !== this.props.currentUser.photo) {
                formData.append('photo', this.state.pictures[0].file)
            }
            else if (this.state.pictures.length === 0){
                formData.append('photo', new File([], ''));
            }
            this.props.updateProfile(formData);
            this.props.closeProfile();
        }
    }

    render() {
        const formElementArray = []
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let formInputs = formElementArray.map(formElement => (
            <div key={formElement.id}>
                <p className={classes.Label}>
                    {formElement.config.label}
                </p>
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => (this.inputChangedHandler(event,
                        formElement.id))}

                    shouldValidate={true}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}
                    colorGreen={true}
                />
            </div>
        ));

        let form = <Spinner />;
        if(!this.props.loading){
            form = (
                <form>
                    {formInputs}
                    <div className={classes.ImageContainer}>
                        <UploadImages
                            upload={this.pictureUploadHandler}
                            images={this.state.pictures}
                            registration={false}
                            tranparentButtons={false}
                            userEdit={true}
                        />
                    </div>
                    <Button click={this.submitHandler}>
                        Submit changes
                    </Button>
                </form>
            );
        }

        return(
            <div className={classes.EditProfile}>
                <h2>Edit your profile</h2>
                {form}
                <br/>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.user,
    loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
    updateProfile: (form) => dispatch(userEdit(form)),
    createError: (msg, body) => dispatch(createError(msg, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);