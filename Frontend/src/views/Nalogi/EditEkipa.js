import React from 'react';
import ManagedInput from '../common/ManagedInput';

import {
    Button,
    Row,
    Col
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

    const posodobiEkipo = () => {
        props.posodobiEkipo(ekipa);
    }

    const ponovnoUporabi = () => {
        props.ponovnoUporabi(ekipa)
    }

    const formatDate = (date) => {
        return new Date(date).toISOString().substr(0, 10);
    }

    return (
        <>
            <Row>
                <Col>
                    <hr className="my-4" />
                </Col>
            </Row>
            <Row>
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
                    <h6 className="heading-small text-muted mb-4">Sofer</h6>
                    <span>{ekipa.sofer.ime + " " + ekipa.sofer.priimek}</span>
                </Col>
            </Row>
            <Row>
                <Col lg="4">
                    <ManagedInput label="Datum" required type="date" name="datum" value={formatDate(ekipa.datum)} onChange={ekipaChange} />
                </Col>
                <Col lg="4">
                    <ManagedInput label="Start" required type="date" name="start" value={formatDate(ekipa.start)} onChange={ekipaChange} />
                </Col>
                <Col lg="4">
                    <ManagedInput label="Konec" required type="date" name="konec" value={formatDate(ekipa.konec)} onChange={ekipaChange} />
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <ManagedInput label="Pričetek dela" required type="date" name="pricetekDela" value={formatDate(ekipa.pricetekDela)} onChange={ekipaChange} />
                </Col>
                <Col lg="6">
                    <ManagedInput label="Konec dela" required type="date" name="konecDela" value={formatDate(ekipa.konecDela)} onChange={ekipaChange} />
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <ManagedInput label="Odsotnost šoferja" required type="number" step="0.01" name="odsotnostSoferja" value={ekipa.odsotnostSoferja} onChange={ekipaChange} />
                </Col>
                <Col lg="6">
                    <ManagedInput label="Odsotnost delavca" required type="number" step="0.01" name="odsotnostDelavca" value={ekipa.odsotnostDelavca} onChange={ekipaChange} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg="3">
                    <ManagedInput label="Neto delo" required type="number" step="0.01" name="netoDelo" value={ekipa.netoDelo} onChange={ekipaChangeNumber} />
                </Col>
                <Col lg="3">
                    <ManagedInput label="Neto montaža" required type="number" step="0.01" name="netoMontaza" value={ekipa.netoMontaza} onChange={ekipaChangeNumber} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button color="success" onClick={ponovnoUporabi}>Ponovno uporabi</Button>
                </Col>
                <Col className="text-right">
                    <Button color="danger" onClick={posodobiEkipo}>Shrani spremembe</Button>
                </Col>
            </Row>
        </>
    );
}

export default EditEkipa;