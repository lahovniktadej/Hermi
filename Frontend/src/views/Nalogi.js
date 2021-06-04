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
    Input,
    FormGroup,
    Modal,
    CardFooter,
    ListGroup,
    ListGroupItem,
    Pagination,
    PaginationItem,
    PaginationLink,
    UncontrolledTooltip
} from 'reactstrap';

function Nalogi() {
    const [nalogi, setNalogi] = React.useState([]);
    const [delovci, setDelavci] = React.useState([]);
    const [nalog, setNalog] = React.useState({
        sifra: "",
        naziv: "",
        objekt: "",
        zacetek: "",
        ekipe: []
    });
    const [ekipa, setEkipa] = React.useState({
        sofer: "",
        delavci: []
    });
    const [soferIndex, setSoferIndex] = React.useState(0);

    const [page, setPage] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(0);
    const perPage = 5;

    React.useEffect(() => {
        axios.get(`/api/delovniNalog`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const delovniNalogi = res.data.content;
                setPageNumber(res.data.totalPages);
                setNalogi(delovniNalogi);
            });
        axios.get(`/api/delavec`)
            .then((res) => {
                const delavci = res.data;
                setDelavci(delavci);
            });
    }, []);

    const soferChange = (el) => {
        const index = el.target.value;
        setSoferIndex(index);
        setEkipa({
            ...ekipa,
            sofer: delovci[index]
        });
    }

    const dodajNalog = (el) => {
        el.preventDefault();

        setPage(pageNumber - 1);
        let nalogiArr = Array.from(nalogi);

        nalog.ekipe.push(ekipa)
        nalog.zacetek = new Date(nalog.zacetek).toISOString();

        nalogiArr.push(nalog);

        axios.post(`/api/delovniNalog`, nalog).then();

        setNalogi(nalogiArr);
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

    const DelavecItem = (props) => {
        return (
            <DropdownItem onClick={() => dodajDelavca(props.delavec)}>
                <span>{props.delavec.ime + " " + props.delavec.priimek}</span>
            </DropdownItem>
        );
    }

    const odstraniDelavca = (delavec) => {
        let delavci = Array.from(ekipa.delavci);
        delavci.splice(delavci.indexOf(delavec), 1);
        setEkipa({
            ...ekipa,
            delavci: delavci
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

    const [selectedNalog, setSelectedNalog] = React.useState(nalog);
    const [ekipaModalState, setEkipaModalState] = React.useState(false);
    const toggleEkipaModal = (nalog) => {
        setEkipaModalState(!ekipaModalState);
        if (!ekipaModalState) {
            setSelectedNalog(nalog || {
                sifra: "",
                naziv: "",
                objekt: "",
                zacetek: "",
                ekipa: []
            });
        }
    };

    const EkipaModal = (props) => {
        return (
            <Modal scrollable className="modal-dialog-centered" size="lg" isOpen={ekipaModalState} toggle={toggleEkipaModal}>
                <div className="modal-header">
                    <h6 className="heading">Ekipe</h6>
                    <Button color onClick={toggleEkipaModal}>
                        <i class="fas fa-times"></i>
                    </Button>
                </div>
                <div className="modal-body bg-secondary pl-lg-4">
                    {
                        selectedNalog.ekipe.map((ekipa) => {
                            return (
                                <>
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
                                                <label className="form-control-label" htmlFor="pricetekDela" >Pričetek dela</label>
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
                                                <label className="form-control-label" htmlFor="odsotnostDelavca" >Odsotnost delavca</label>
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
                                                <label className="form-control-label" htmlFor="netoMontaza" >Neto montaža</label>
                                                <Input className="form-control-alternative" type="text" id="netoMontaza" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button color="success">Ponovno uporabi</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr className="my-4" />
                                        </Col>
                                    </Row>
                                </>
                            );
                        })
                    }
                    <Row>
                        <Col>
                            <h6 className="heading-small text-muted mb-4">Dodaj ekipo</h6>
                        </Col>
                    </Row>
                    <Form>
                        <DelovciAdder />
                        <Row>
                            <Col className="text-center">
                                <Button color="danger" onClick={dodajEkipo}>Dodaj</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="modal-footer">
                    <Button color="danger">Shrani spremembe</Button>
                </div>
            </Modal>
        );
    }

    const dodajEkipo = () => {
        let nalogiArr = Array.from(nalogi);
        let nalog = nalogiArr[nalogiArr.indexOf(selectedNalog)]
        nalog.ekipe.push(ekipa);
        setNalogi(nalogiArr);

        axios.put(`/api/delovniNalog/${nalog.id}`, nalog).then();
    }

    const [nalogModalState, setNalogModalState] = React.useState(false);
    const toggleNalogModal = (nalog) => {
        setNalogModalState(!nalogModalState);
        if (!nalogModalState) {
            setSelectedNalog(nalog || {
                sifra: "",
                naziv: "",
                objekt: "",
                zacetek: "",
                ekipe: [
                    {
                        sofer: {},
                        delavci: []
                    }
                ]
            });
        }
    };

    const NalogModal = (props) => {
        return (
            <Modal className="modal-dialog-centered" size="lg" isOpen={nalogModalState} toggle={toggleNalogModal}>
                <div className="modal-header">
                    <h6 className="heading">{selectedNalog.naziv}</h6>
                    <Button color onClick={toggleNalogModal}>
                        <i class="fas fa-times"></i>
                    </Button>
                </div>
                <div className="modal-body bg-secondary pl-lg-4">
                    <Row>
                        <Col lg="3">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="sifra" >Šifra</label>
                                <Input className="form-control-alternative" type="text" id="sifra" required name="sifra" value={selectedNalog.sifra} onChange={nalogChange} />
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="naziv" >Naziv</label>
                                <Input className="form-control-alternative" type="text" id="naziv" required name="naziv" value={selectedNalog.naziv} onChange={nalogChange} />
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="objekt" >Objekt</label>
                                <Input className="form-control-alternative" type="text" id="objekt" required name="objekt" value={selectedNalog.objekt} onChange={nalogChange} />
                            </FormGroup>
                        </Col>
                        <Col lg="3">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="zacetek" >Začetek</label>
                                <Input className="form-control-alternative" type="date" id="zacetek" required name="zacetek" value={selectedNalog.zacetek} onChange={nalogChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button color="danger">Shrani spremembe</Button>
                </div>
            </Modal>
        );
    }

    const [soferCheck, setSoferCheck] = React.useState(false);
    const soferCheckChange = (e) => {
        setSoferCheck(e.target.checked);
    }

    const DelovciAdder = () => {
        return (
            <Row className="justify-content-md-center">
                <Col lg="4">
                    <label className="form-control-label" htmlFor="sofer" >Delavci</label>
                    <div className="text-center">
                        <ListGroup>
                            {ekipa.delavci.map((delavec) => { return <DelavecListItem delavec={delavec} /> })}
                        </ListGroup>
                        <UncontrolledDropdown className="my-2">
                            <DropdownToggle color><i class="fas fa-plus"></i></DropdownToggle>
                            <DropdownMenu>
                                {delovci.filter((val) => { return !ekipa.delavci.includes(val) }).map((delavec) => { return <DelavecItem delavec={delavec} /> })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Col>
                <Col lg="4">
                    <Row className="justify-content-md-between">
                        <Col sm="2">
                            <label className="form-control-label" htmlFor="sofer-check" >Šofer</label>
                        </Col>
                        <Col sm="2">
                            <label className="custom-toggle">
                                <input type="checkbox" id="sofer-check" onChange={soferCheckChange} />
                                <span className="custom-toggle-slider rounded-circle" />
                            </label>
                        </Col>
                    </Row>
                    <FormGroup>
                        {
                            (soferCheck) ? (
                                <Input className="form-control-alternative" type="select" id="sofer" required value={soferIndex} onChange={soferChange} >
                                    {delovci.map((delavec, index) => { return <option value={index}>{delavec.ime + " " + delavec.priimek}</option> })}
                                </Input>
                            ) : <></>
                        }
                    </FormGroup>
                </Col>
            </Row>
        );
    }

    const removeNalog = (nalog) => {
        let nalogiArr = Array.from(nalogi);
        nalogiArr.splice(nalogiArr.indexOf(nalog), 1);
        setNalogi(nalogiArr);

        axios.delete(`/api/delovniNalog/${nalog.id}`).then();
    }

    const Tr = (props) => {
        return (
            <>
                <UncontrolledTooltip delay={0} placement="top" target="status-nekoncano">Aktiven</UncontrolledTooltip>
                <tr>
                    <td>
                        {
                            (!props.row.status) ? <i id="status-nekoncano" class="fas fa-circle fa-xs text-red"></i> : <i id="status-koncano" class="fas fa-circle fa-xs text-green"></i>
                        }
                    </td>
                    <td>{props.row.sifra}</td>
                    <td>{props.row.naziv}</td>
                    <td>{props.row.objekt}</td>
                    <td>{new Date(props.row.zacetek).toLocaleString()}</td>
                    <td>
                        <Button size="sm" color="success" onClick={() => toggleEkipaModal(props.row)} >Ekipe</Button>
                    </td>
                    <td className="text-right">
                        <UncontrolledDropdown>
                            <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color onClick={(e) => e.preventDefault()}>
                                <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem onClick={() => toggleNalogModal(props.row)}> Uredi </DropdownItem>
                                <DropdownItem className="text-red" onClick={() => removeNalog(props.row)}> Odstrani </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
            </>
        );
    }

    const changePage = (page) => {
        axios.get(`/api/delovniNalog`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const delovniNalogi = res.data.content;
                setPageNumber(res.data.totalPages);
                setNalogi(delovniNalogi);
            });
        setPage(page);
    }

    const PaginationStrip = () => {
        return (
            <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
                <PaginationItem className={(page == 0) ? "disabled" : ""}>
                    <PaginationLink aria-label="Next" onClick={() => changePage(page - 1)} >
                        <i className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                    </PaginationLink>
                </PaginationItem>
                {
                    Array.from(new Array(pageNumber).keys()).map((number) => {
                        return (
                            <PaginationItem className={(page == number) ? "active" : ""}>
                                <PaginationLink onClick={() => changePage(number)}>
                                    {number + 1}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })
                }
                <PaginationItem className={(page + 1 == pageNumber) ? "disabled" : ""}>
                    <PaginationLink aria-label="Next" onClick={() => changePage(page + 1)} >
                        <i className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
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
                                <h3 className="mb-0">Delovni nalogi</h3>
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
                            <CardFooter>
                                {(pageNumber > 1) ? <PaginationStrip /> : <></>}
                            </CardFooter>
                            <NalogModal />
                            <EkipaModal />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-5">
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
                                        <DelovciAdder />
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
