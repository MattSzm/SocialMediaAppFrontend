import React from "react";
import classes from './Input.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

const InputCreatePostStyledDiv = styled.div.attrs(props =>({
    precent: props.precent
}))`
        width: 87%;
        box-sizing: border-box;
        margin-right: 8px;
        &:after{
            content: "";
            display: block;
            position: relative;
            margin: 0;
            width: ${props => props.precent}%;
            border-bottom: 2px solid ${props => 
                props.precent < 100 ? '#1DA1F2' : '#f37d7d'};
        }
        @media(max-width: 400px){
            width: 78%;
           }
    }`;


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
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }
    let output = (
                <div className={classes.Input}>
                        {inputElement}
                </div>);
    if (props.createPost){
        output = (
                <InputCreatePostStyledDiv
                    precent={props.value.length < props.maxLength ?
                        (props.value.length/props.maxLength)*100 : 100}>
                    {inputElement}
                </InputCreatePostStyledDiv>
        );
    }
    return output;
}

export default input;