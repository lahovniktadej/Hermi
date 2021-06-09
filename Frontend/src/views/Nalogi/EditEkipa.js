import React from 'react';
import ManagedInput from '../common/ManagedInput';

import {
    Button,
    Row,
    Col,
    Form
} from 'reactstrap';

function EditEkipa(props) {
    const [ekipa, setEkipa] = React.useState(props.ekipa);

    const ekipaChange = (e) => {
        setEkipa({
            ...ekipa,
            [e.target.name]: e.target.value
        });
    }

    const ekipaChangeNumber = (e) => {
        setEkipa({
            ...ekipa,
            [e.target.name]: Number(e.target.value)
        });
    }

    const posodobiEkipo = (e) => {
        e.preventDefault();
        props.posodobiEkipo(ekipa);
    }

    const ponovnoUporabi = () => {
        props.ponovnoUporabi(ekipa);
    }

    const zakljuciDelo = () => {
        let ekipaStatus = {
            ...ekipa,
            status: true
        };
        setEkipa({
            ...ekipa,
            status: true
        });
        props.posodobiEkipo(ekipaStatus);
    }

    const formatDate = (date) => {
        return new Date(date).toISOString().slice(0, 10);
    }

    return (
        <>
            <Row>
                <Col>
                    <hr className="my-4" />
                </Col>
            </Row>
            <Row>
                <Col sm="1" className="text-center">
                    {
                        (!ekipa.status) ? <i class="fas fa-circle fa-xs text-red"></i> : <i class="fas fa-circle fa-xs text-green"></i>
                    }
                </Col>
                <Col>
                    <h4 className="heading">{new Date(ekipa.datum).toLocaleDateString()}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6 className="heading-small text-muted mb-4">Delavci</h6>
                    <ul type="unstyled">
                        {
                            ekipa.delavci.map((delavec) => {
                                return (
                                    <li>{delavec.ime + " " + delavec.priimek}</li>
                                );
                            })
                        }
                    </ul>
                </Col>
                <Col>
                    <h6 className="heading-small text-muted mb-4">Šofer</h6>
                    <span>{ekipa.sofer.ime + " " + ekipa.sofer.priimek}</span>
                </Col>
                <Col>
                    <h6 className="heading-small text-muted mb-4">Vozilo</h6>
                    <span>{ekipa.vozilo.naziv}</span>
                </Col>
            </Row>
            <Form onSubmit={posodobiEkipo}>
                <Row>
                    <Col lg="4">
                        <ManagedInput label="Datum" required type="date" name="datum" value={formatDate(ekipa.datum)} onChange={ekipaChange} />
                    </Col>
                    <Col lg="4">
                        <ManagedInput label="Start" required type="number" step="0.01" name="start" value={ekipa.start} onChange={ekipaChangeNumber} />
                    </Col>
                    <Col lg="4">
                        <ManagedInput label="Prihod" required type="number" step="0.01" name="prihod" value={ekipa.prihod} onChange={ekipaChangeNumber} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <ManagedInput label="Pričetek dela" required type="number" step="0.01" name="pricetekDela" value={ekipa.pricetekDela} onChange={ekipaChangeNumber} />
                    </Col>
                    <Col lg="6">
                        <ManagedInput label="Konec dela" required type="number" step="0.01" name="konecDela" value={ekipa.konecDela} onChange={ekipaChangeNumber} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <ManagedInput label="Odsotnost šoferja" required type="number" step="0.01" name="odsotnostSoferja" value={ekipa.odsotnostSoferja} onChange={ekipaChangeNumber} />
                    </Col>
                    <Col lg="6">
                        <ManagedInput label="Odsotnost delavca" required type="number" step="0.01" name="odsotnostDelavca" value={ekipa.odsotnostDelavca} onChange={ekipaChangeNumber} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg="3">
                        <ManagedInput label="Neto montaža" required type="number" step="0.01" name="netoMontaza" value={ekipa.netoMontaza} onChange={ekipaChangeNumber} />
                    </Col>
                    <Col lg="3">
                        <ManagedInput label="Bruto montaža" required type="number" step="0.01" name="brutoMontaza" value={ekipa.brutoMontaza} onChange={ekipaChangeNumber} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="primary" type="button" onClick={ponovnoUporabi}>Ponovno uporabi</Button>
                    </Col>
                    <Col className="text-right">
                        <Button color="success" onClick={zakljuciDelo}>Zaključi delo</Button>
                    </Col>
                    <Col className="text-right">
                        <Button color="danger" type="submit">Shrani spremembe</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default EditEkipa;