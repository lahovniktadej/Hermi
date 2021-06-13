import React from 'react';
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

    const [nalog, setNalog] = React.useState(emptyNalog);

    const dodajNalog = (el) => {
        el.preventDefault();   

        nalog.zacetek = new Date(nalog.zacetek).toISOString();
        nalog.spremenil = sessionStorage.getItem("user_uid");

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