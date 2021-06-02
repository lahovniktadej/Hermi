import React from 'react';
import Header from 'components/Headers/Header';
import axios from 'axios';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    Table,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Button,
    CardBody,
    Form,
    List,
    Input,
    FormGroup,
    Modal,
    CardFooter,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

function Nalogi() {
    const [nalogi, setNalogi] = React.useState([]);
    const [delovci, setDelavci] = React.useState([]);
    const [nalog, setNalog] = React.useState({
        sifra: "",
        naziv: "",
        objekt: "",
        zacetek: "",
        ekipa: {
            sofer: {},
            delavci: []
        }
    });
    const [soferIndex, setSoferIndex] = React.useState(0);

    React.useEffect(() => {
        axios.get(`/api/delovniNalog`)
            .then((res) => {
                const delovniNalogi = res.data;
                setNalogi(delovniNalogi);
            });
        axios.get(`/api/delavec`)
            .then((res) => {
                const delavci = res.data;
                setDelavci(delavci);
            });
    }, []);

    const soferChange = (el) => {
        setSoferIndex(el.target.value);
        setNalog({
            ...nalog,
            ekipa: {
                ...nalog.ekipa,
                sofer: delovci[soferIndex]
            }
        });
    }

    const dodajNalog = (el) => {
        el.preventDefault();
        let nalogiArr = Array.from(nalogi);

        let time = new Date(nalog.zacetek).toISOString().replace("Z", "").replace(".000", "").split('T');
        nalog.zacetek = time[1] + " " + time[0];
        nalogiArr.push(nalog);

        axios.post(`/api/ekipa`, nalog.ekipa)
            .then((res) => {
                nalog.ekipa = res.data;
                axios.post(`/api/delovniNalog`, nalog).then();
            });

        setNalogi(nalogiArr);
    }

    const nalogChange = (el) => {
        setNalog({
            ...nalog,
            [el.target.name]: el.target.value,
            ekipa: {
                ...nalog.ekipa
            }
        });
    }

    const dodajDelavca = (delavec) => {
        let delavci = Array.from(nalog.ekipa.delavci);
        delavci.push(delavec);
        setNalog({
            ...nalog,
            ekipa: {
                ...nalog.ekipa,
                delavci: delavci
            }
        });
    }

    const DelavecItem = (props) => {
        return (
            <DropdownItem onClick={() => dodajDelavca(props.delavec)}>
                <span>{props.delavec.ime + " " + props.delavec.priimek}</span>
            </DropdownItem>
        );
    }

    const odstraniDelavca = (delavec) => {
        let delavci = Array.from(nalog.ekipa.delavci);
        delavci.splice(delavci.indexOf(delavec), 1);
        setNalog({
            ...nalog,
            ekipa: {
                ...nalog.ekipa,
                delavci: delavci
            }
        });
    }

    const DelavecListItem = (data) => {
        return (
            <ListGroupItem>
                <span>{data.delavec.ime + " " + data.delavec.priimek}</span>
                <Button color size="sm" className="float-right" onClick={() => odstraniDelavca(data.delavec)}>
                    <i class="fas fa-times"></i>
                </Button>
            </ListGroupItem>
        );
    }

    const [ekipaModalState, setEkipaModalState] = React.useState(false);
    const toggleEkipaModal = () => setEkipaModalState(!ekipaModalState);

    const EkipaModal = (props) => {
        return (
            <Modal className="modal-dialog-centered" size="lg" isOpen={ekipaModalState} toggle={toggleEkipaModal}>
                <div className="modal-header">
                    <h6 className="heading">Ekipa</h6>
                    <Button color onClick={toggleEkipaModal}>
                        <i class="fas fa-times"></i>
                    </Button>
                </div>
                <div className="modal-body bg-secondary pl-lg-4">
                    <Row>
                        <Col>
                            <h6 className="heading-small text-muted mb-4">Delavci</h6>
                            <ul type="unstyled">
                                {
                                    props.nalog.ekipa.delavci.map((delavec) => {
                                        return (
                                            <li>{delavec.ime + " " + delavec.priimek}</li>
                                        );
                                    })
                                }
                            </ul>
                        </Col>
                        <Col>
                            <h6 className="heading-small text-muted mb-4">Sofer</h6>
                            <span>{props.nalog.ekipa.sofer.ime + " " + props.nalog.ekipa.sofer.priimek}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="datum" >Datum</label>
                                <Input className="form-control-alternative" type="date" id="datum" />
                            </FormGroup>
                        </Col>
                        <Col lg="4">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="start" >Start</label>
                                <Input className="form-control-alternative" type="date" id="start" />
                            </FormGroup>
                        </Col>
                        <Col lg="4">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="konec" >Konec</label>
                                <Input className="form-control-alternative" type="date" id="konec" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="pricetekDela" >Pricetek dela</label>
                                <Input className="form-control-alternative" type="date" id="pricetekDela" />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="konecDela" >Konec dela</label>
                                <Input className="form-control-alternative" type="date" id="konecDela" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="odsotnostSoferja" >Odsotnost šoferja</label>
                                <Input className="form-control-alternative" type="date" id="odsotnostSoferja" />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="odsotnostDelavca" >Odsotnost Delavca</label>
                                <Input className="form-control-alternative" type="date" id="odsotnostDelavca" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="3">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="netoDelo" >Neto delo</label>
                                <Input className="form-control-alternative" type="text" id="netoDelo" />
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="netoMontaza" >Neto montaza</label>
                                <Input className="form-control-alternative" type="text" id="netoMontaza" />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button color="success">Ponovi</Button>
                    <Button color="secondary" onClick={toggleEkipaModal}>Zapri</Button>
                    <Button color="danger">Save changes</Button>
                </div>
            </Modal>
        );
    }

    const Tr = (props) => {
        return (
            <tr>
                <td>{(props.row.status === "nekoncano") ? <i class="fas fa-circle fa-xs text-red"></i> : <i class="fas fa-circle fa-xs text-green"></i>}</td>
                <td>{props.row.sifra}</td>
                <td>{props.row.naziv}</td>
                <td>{props.row.objekt}</td>
                <td>{props.row.zacetek}</td>
                <td>
                    <Button size="sm" color="success" onClick={toggleEkipaModal} >Ekipa</Button>
                    <EkipaModal nalog={props.row} />
                </td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={(e) => e.preventDefault()}> Uredi </DropdownItem>
                            <DropdownItem className="text-red" onClick={(e) => e.preventDefault()}> Odstrani </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    }

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Odprti nalogi</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush text-center" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Status</th>
                                        <th scope="col">Šifra</th>
                                        <th scope="col">Naziv</th>
                                        <th scope="col">Objekt</th>
                                        <th scope="col">Zacetek</th>
                                        <th scope="col">Ekipa</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {nalogi.map((nalog) => { return <Tr row={nalog} /> })}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow bg-secondary">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Dodaj nalog</h3>
                            </CardHeader>
                            <Form onSubmit={dodajNalog} >
                                <CardBody>
                                    <h6 className="heading-small text-muted mb-4">Nalog</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="3">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="sifra" >Šifra</label>
                                                    <Input className="form-control-alternative" type="text" id="sifra" required name="sifra" value={nalog.sifra} onChange={nalogChange} />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="3">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="naziv" >Naziv</label>
                                                    <Input className="form-control-alternative" type="text" id="naziv" required name="naziv" value={nalog.naziv} onChange={nalogChange} />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="3">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="objekt" >Objekt</label>
                                                    <Input className="form-control-alternative" type="text" id="objekt" required name="objekt" value={nalog.objekt} onChange={nalogChange} />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="3">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="zacetek" >Začetek</label>
                                                    <Input className="form-control-alternative" type="date" id="zacetek" required name="zacetek" value={nalog.zacetek} onChange={nalogChange} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">Ekipa</h6>
                                    <div className="pl-lg-4">
                                        <Row className="justify-content-md-center">
                                            <Col lg="4">
                                                <label className="form-control-label" htmlFor="sofer" >Delavci</label>
                                                <div className="text-center">
                                                    <ListGroup>
                                                        {nalog.ekipa.delavci.map((delavec) => { return <DelavecListItem delavec={delavec} /> })}
                                                    </ListGroup>
                                                    <UncontrolledDropdown className="my-2">
                                                        <DropdownToggle color><i class="fas fa-plus"></i></DropdownToggle>
                                                        <DropdownMenu>
                                                            {delovci.filter((val) => { return !nalog.ekipa.delavci.includes(val) }).map((delavec) => { return <DelavecItem delavec={delavec} /> })}
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="sofer" >Šofer</label>
                                                    <Input className="form-control-alternative" type="select" id="sofer" required value={soferIndex} onChange={soferChange} >
                                                        {delovci.map((delavec, index) => { return <option value={index}>{delavec.ime + " " + delavec.priimek}</option> })}
                                                    </Input>
                                                </FormGroup>
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
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Nalogi;
