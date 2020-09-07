import React from "react";
import classes from './Input.module.css';
import TextareaAutosize from 'react-textarea-autosize';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    if(props.createPost){
        inputClasses = [classes.InputElementCreatePost];
    }
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    if(!props.invalid && props.colorGreen && props.touched){
        inputClasses.push(classes.ColorGreen);
    }
    if(props.elementType === 'textarea'){
        inputClasses.push(classes.textarea);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <TextareaAutosize
                minRows = {2}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('image'):
            inputElement = (<file
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                accept="image/*"/>);
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return (
        <div className={props.createPost ?
            classes.InputCreatePost : classes.Input}>
            {inputElement}
        </div>
    );
}

export default input;