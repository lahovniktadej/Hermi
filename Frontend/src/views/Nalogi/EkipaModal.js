import React from 'react';
import AddEkipa from './AddEkipa';
import EditEkipa from './EditEkipa';

import {
    Modal,
    Button,
    Row,
    Col,
    Form
} from 'reactstrap';

function EkipaModal(props) {
    const [ekipa, setEkipa] = React.useState({
        sofer: {},
        delavci: [],
        vozilo: {}
    });

    const dodajDelavca = (delavec) => {
        let delavci = Array.from(ekipa.delavci);
        delavci.push(delavec);
        setEkipa({
            ...ekipa,
            delavci: delavci
        });
    }

    const odstraniDelavca = (delavec) => {
        let delavci = Array.from(ekipa.delavci);
        delavci.splice(delavci.indexOf(delavec), 1);
        setEkipa({
            ...ekipa,
            delavci: delavci
        });
    }

    const spremeniSoferja = (sofer) => {
        setEkipa({
            ...ekipa,
            sofer: sofer
        });
    }

    const spremeniVozilo = (vozilo) => {
        setEkipa({
            ...ekipa,
            vozilo: vozilo
        });
    }

    const dodajEkipo = (e) => {
        e.preventDefault();
        props.dodajEkipo(ekipa);
        setEkipa({
            sofer: {},
            delavci: [],
            vozilo: {}
        });
    }

    const ponovnoUporabi = (ekipa) => {
        let ekipaCopy = { ...ekipa };
        ekipaCopy.status = false;
        ekipaCopy.datum = new Date().toISOString();
        setEkipa(ekipaCopy);
    }

    return (
        <Modal scrollable className="modal-dialog-centered" size="lg" isOpen={props.state} toggle={props.toggle}>
            <div className="modal-header">
                <h6 className="heading">Dnevno delo</h6>
                <Button color className="close" onClick={props.toggle}>
                    <i class="fas fa-times"></i>
                </Button>
            </div>
            <div className="modal-body bg-secondary pl-lg-4">
                <Form onSubmit={dodajEkipo}>
                    <Row>
                        <Col>
                            <h6 className="heading-small text-muted mb-4">Dodaj ekipo</h6>
                        </Col>
                    </Row>
                    <AddEkipa ekipa={ekipa} delavci={props.delavci} dodajDelavca={dodajDelavca} odstraniDelavca={odstraniDelavca} spremeniSoferja={spremeniSoferja} vozila={props.vozila} spremeniVozilo={spremeniVozilo} />
                    <Row>
                        <Col className="text-center">
                            <Button color="danger">Dodaj</Button>
                        </Col>
                    </Row>
                </Form>
                {
                    props.nalog.ekipe.map((ekipa) => { return <EditEkipa ekipa={ekipa} posodobiEkipo={props.posodobiEkipo} ponovnoUporabi={ponovnoUporabi} /> })
                }
            </div>
        </Modal>
    );
}

export default EkipaModal;