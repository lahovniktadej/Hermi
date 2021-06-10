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

    const change = (e) => {
        let nalog = {
            ...props.nalog,
            [e.target.name]: e.target.value
        };
        props.onChange(nalog);
    }

    const submit = (e) => {
        e.preventDefault();
        props.onSubmit(props.nalog);
        props.toggle();
    }

    const zakljuci = (e) => {
        e.preventDefault();
        props.zakljuciNalog(props.nalog);
    }

    const formatDate = (date) => {
        return new Date(date).toISOString().slice(0, 10);
    }

    return (
        <Modal scrollable className="modal-dialog-centered" size="lg" isOpen={props.state} toggle={props.toggle}>
            <div className="modal-header">
                <h6 className="heading">{props.nalog.naziv}</h6>
                <Button color onClick={props.toggle}>
                    <i class="fas fa-times"></i>
                </Button>
            </div>
            <Form onSubmit={submit}>
                {console.log(props.nalog)}
                <div className="modal-body bg-secondary pl-lg-4">
                    <Row>
                        <Col lg="4">
                            <ManagedInput label="Šifra" value={props.nalog.sifra} name="sifra" onChange={change} />
                        </Col>
                        <Col lg="4">
                            <ManagedInput label="Naziv" value={props.nalog.naziv} name="naziv" onChange={change} />
                        </Col>
                        <Col lg="4">
                            <ManagedInput label="Objekt" value={props.nalog.objekt} name="objekt" onChange={change} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <ManagedInput label="Začetek" type="date" value={formatDate(props.nalog.zacetek)} name="zacetek" onChange={change} />
                        </Col>
                        <Col lg="4">
                            <ManagedInput label="Konec" type="date" value={formatDate(props.nalog.konec)} name="konec" onChange={change} />
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Row>
                        <Col>
                            <Button color="success" onClick={zakljuci} >Zaključi nalog</Button>
                            <Button color="danger">Shrani</Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Modal>
    );
}

export default NalogaModal;