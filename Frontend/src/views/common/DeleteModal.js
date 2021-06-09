import React from 'react';

import { Button, Modal } from 'reactstrap';

function DeleteModal(props) {

    const submit = () => {
        props.toggle();
        props.onSubmit();
    }

    return (
        <Modal className="modal-dialog-centered modal-danger" isOpen={props.state} toggle={props.toggle}>
            <div className="modal-header">
                <Button className="close" color="" onClick={props.toggle}>
                    <i class="fas fa-times text-white"></i>
                </Button>
            </div>
            <div className="modal-body">
                <div className="text-center">
                    <h4 className="heading">Pozor!</h4>
                    <p>
                        {props.text}
                    </p>
                </div>
            </div>
            <div className="modal-footer">
                <Button className="btn-white" color="default" onClick={submit}>Da</Button>
                <Button className="text-white ml-auto" color="" onClick={props.toggle}>Ne</Button>
            </div>
        </Modal>
    );
}

export default DeleteModal;