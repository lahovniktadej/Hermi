import React from 'react';
import ManagedInput from '../common/ManagedInput';
import {
    Button,
    Row,
    Col,
    Form
} from 'reactstrap';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function EditEkipa(props) {
    const [ekipa, setEkipa] = React.useState(props.ekipa);

    const ekipaChange = (e) => {
        let ekipaCopy = {
            ...ekipa,
            [e.target.name]: e.target.value
        };

        ekipaCopy.odsotnostSoferja = Number(timeDelta(ekipaCopy.prihod, ekipaCopy.start));
        ekipaCopy.odsotnostDelavca = Number((timeDelta(ekipaCopy.konecDela, ekipaCopy.pricetekDela) > 8) ? timeDelta(ekipaCopy.konecDela, ekipaCopy.pricetekDela) : 8);
        ekipaCopy.netoDelo = Number(timeDelta(ekipaCopy.konecDela, ekipaCopy.pricetekDela));
        ekipaCopy.netoMontaza = Number(ekipaCopy.delavci.length * timeDelta(ekipaCopy.konecDela, ekipaCopy.pricetekDela));
        ekipaCopy.brutoMontaza = Number(ekipaCopy.odsotnostSoferja + ekipaCopy.delavci.length * ekipaCopy.odsotnostDelavca).toFixed(2);

        setEkipa(ekipaCopy);
    }

    const timeDelta = (time1, time2) => {
        return Number.parseFloat(dayjs(time1, ["HH:mm", "HH:mm:ss"]).diff(dayjs(time2, ["HH:mm", "HH:mm:ss"]), "h", true)).toFixed(2);
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
                        <ManagedInput label="Start" required type="time" name="start" value={ekipa.start} onChange={ekipaChange} />
                    </Col>
                    <Col lg="4">
                        <ManagedInput label="Prihod" required type="time" name="prihod" value={ekipa.prihod} onChange={ekipaChange} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <ManagedInput label="Pričetek dela" required type="time" name="pricetekDela" value={ekipa.pricetekDela} onChange={ekipaChange} />
                    </Col>
                    <Col lg="6">
                        <ManagedInput label="Konec dela" required type="time" name="konecDela" value={ekipa.konecDela} onChange={ekipaChange} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <ManagedInput label="Odsotnost šoferja" required type="number" min="0" step="0.01" name="odsotnostSoferja" value={ekipa.odsotnostSoferja} onChange={ekipaChangeNumber} />
                    </Col>
                    <Col lg="6">
                        <ManagedInput label="Odsotnost delavca" required type="number" min="0" step="0.01" name="odsotnostDelavca" value={ekipa.odsotnostDelavca} onChange={ekipaChangeNumber} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg="3">
                        <ManagedInput label="Neto delo" required type="number" min="0" step="0.01" name="netoDelo" value={ekipa.netoDelo} onChange={ekipaChangeNumber} />
                    </Col>
                    <Col lg="3">
                        <ManagedInput label="Neto montaža" required type="number" min="0" step="0.01" name="netoMontaza" value={ekipa.netoMontaza} onChange={ekipaChangeNumber} />
                    </Col>
                    <Col lg="3">
                        <ManagedInput label="Bruto montaža" required type="number" min="0" step="0.01" name="brutoMontaza" value={ekipa.brutoMontaza} onChange={ekipaChangeNumber} />
                    </Col>
                </Row>
                <Row className="justify-content-between">
                    <Col>
                        <Button color="secondary" type="button" onClick={ponovnoUporabi}>Ponovno uporabi</Button>
                    </Col>
                    <Col className="text-right">
                        <Button color="success" onClick={zakljuciDelo}>Zaključi delo</Button>
                        <Button color="danger" type="submit">Shrani spremembe</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default EditEkipa;