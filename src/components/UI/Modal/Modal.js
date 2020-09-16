import React, {Fragment} from "react";
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import CloseButton from "../CloseButton/CloseButton";


const modal = (props) => {
    let modalClasses = [classes.Modal, classes.ModalBright];
    if (props.dark){
        modalClasses = [classes.Modal, classes.ModalDark];
    }
    if (props.modalUserEdit){
        modalClasses = [classes.ModalUserEdit, classes.ModalBright];
    }
    return (
        <Fragment>
            <Backdrop
                show={props.show}
                clicked={props.closeModalAndBackdrop}
                />

            <div className={modalClasses.join(' ')}
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(100vh)',
                        opacity: props.show ? '1': '0'
                    }}>
                    <CloseButton clicked={props.closeModalAndBackdrop} />
                    {props.children}
                </div>
        </Fragment>
    );
}

export default React.memo(modal);