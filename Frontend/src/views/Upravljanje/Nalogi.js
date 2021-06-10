import React from 'react';
import AddEkipa from 'views/Nalogi/AddEkipa';
import axios from 'axios';
import ManagedInput from 'views/common/ManagedInput';
import {
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Button,
    Form,
    CardFooter
} from 'reactstrap';

function Nalogi() {
    const emptyNalog = {
        sifra: "",
        naziv: "",
        objekt: "",
        ekipe: [],
        zacetek: null,
        konec: null
    }

    const [delavci, setDelavci] = React.useState([]);
    const [vozila, setVozila] = React.useState([]);
    const [nalog, setNalog] = React.useState(emptyNalog);
    const [ekipa, setEkipa] = React.useState({
        sofer: {},
        delavci: [],
        vozilo: {}
    });

    React.useEffect(() => {
        axios.get(`/api/delavec`)
            .then((res) => {
                const delavci = res.data;
                setDelavci(delavci);
            });
        axios.get(`/api/vozilo`)
            .then((res) => {
                const vozila = res.data;
                setVozila(vozila);
            });
    }, []);

    const dodajNalog = (el) => {
        el.preventDefault();   

        //nalog.ekipe.push(ekipa)
        nalog.zacetek = new Date(nalog.zacetek).toISOString();

        axios.post(`/api/delovniNalog`, nalog)
            .then();
    }

    const nalogChange = (el) => {
        setNalog({
            ...nalog,
            [el.target.name]: el.target.value,
            ekipe: [...nalog.ekipe]
        });
    }

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

    return (
        <Card className="shadow bg-secondary">
            <CardHeader className="border-0">
                <h3 className="mb-0">Dodaj delovni nalog</h3>
            </CardHeader>
            <Form onSubmit={dodajNalog} >
                <CardBody>
                    <h6 className="heading-small text-muted mb-4">Delovni nalog</h6>
                    <div className="pl-lg-4">
                        <Row>
                            <Col lg="3">
                                <ManagedInput label="Šifra" required name="sifra" value={nalog.sifra} onChange={nalogChange} />
                            </Col>
                            <Col lg="3">
                                <ManagedInput label="Naziv" required name="naziv" value={nalog.naziv} onChange={nalogChange} />
                            </Col>
                            <Col lg="3">
                                <ManagedInput label="Objekt" required name="objekt" value={nalog.objekt} onChange={nalogChange} />
                            </Col>
                            <Col lg="3">
                                <ManagedInput label="Začetek" required name="zacetek" value={nalog.zacetek} onChange={nalogChange} type="date" />
                            </Col>
                        </Row>
                    </div>
                </CardBody>
                <CardFooter className="border-0">
                    <Row>
                        <Col className="text-center">
                            <Button color="danger">Dodaj</Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Form>
        </Card>
    );
}

export default Nalogi;