import React from 'react';
import { FormGroup, FormText, Input } from 'reactstrap';

function ManagedInput(props) {
    const className = `form-control-alternative${(props.invaild) ? " is-invalid" : ""}`;

    return (
        <FormGroup className="mb-3">
            <label className="form-control-label d-inline">
                <span>{props.label}</span>
                <Input {...props} className={className} type={props.type || "text"}/>
            </label>
            {
                (props.invaild) ? (
                    <FormText color="danger">{props.errorText}</FormText>
                ) : (<></>)
            }
        </FormGroup>
    );
}

export default ManagedInput;