import React from "react";
import { Row } from 'react-bootstrap';
import './input.css';
const Input = (props) => {
    let inputElement = null;
    let label = <label
        className={`text-left ErrorText ${(props.error == "none") ? ' HideLabel' : ' Show'}`}
        id={props.id}
    >
        {props.error == "none" ? null : props.error}
    </label>

    switch (props.type) {
        case ('email'):
            inputElement = <input className={`Input ${(props.error == "none" ? null : " Error")}`} type="email" {...props} />
            break;
        case ('textarea'):
            inputElement = <textarea className={`Input ${(props.error == "none" ? null : " Error")}`} {...props} />
            break;
        case ('text'):
            inputElement = <input className={`Input ${(props.error == "none" ? null : " Error")}`} type="text" {...props} />
            break;
        default:
            inputElement = < input className={`Input ${(props.error == "none" ? null : " Error")}`} type="text" {...props} />
            break;
    }

    return (
        <React.Fragment>
            {label}
            {inputElement}
        </React.Fragment>
    )
}

export default Input;