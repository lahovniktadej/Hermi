import React from 'react';
import ManagedInput from '../common/ManagedInput';

import {
    Modal,
    Button,
    Row,
    Col,
    Form
} from 'reactstrap';

function NalogaModal(props) {
    return (
        <Modal scrollable className="modal-dialog-centered" size="lg" isOpen={props.state} toggle={props.toggle}>
            <div className="modal-header">
                <h6 className="heading">{props.nalog.naziv}</h6>
                <Button color onClick={props.toggle}>
                    <i class="fas fa-times"></i>
                </Button>
            </div>
            <Form>
                <div className="modal-body bg-secondary pl-lg-4">
                    <Row>
                        <Col lg="4">
                            <ManagedInput label="Šifra" />
                        </Col>
                        <Col lg="4">
                            <ManagedInput label="Naziv" />
                        </Col>
                        <Col lg="4">
                            <ManagedInput label="Objekt" />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <ManagedInput label="Začetek" type="date" />
                        </Col>
                        <Col lg="4">
                            <ManagedInput label="Konec" type="date" />
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Row>
                        <Col>
                            <Button color="success">Zaključi&nbsp;nalog</Button>
                        </Col>
                        <Col>
                            <Button color="danger">Shrani</Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Modal>
    );
}

export default NalogaModal;