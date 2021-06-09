import React from 'react';

import {
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Table,
    Container,
    Row,
    Col,
    CardBody,
    FormGroup,
    Form,
    Input,
    Button,
    Modal,
    FormText,
} from "reactstrap";

import axios from 'axios';

function Skrbniki() {
    const [ime, setIme] = React.useState("");
    const [priimek, setPriimek] = React.useState("");
    const [uporabniskoIme, setUporabniskoIme] = React.useState("");
    const [seznamSkrbnikov, setSeznamSkrbnikov] = React.useState([]);

    const [editing, setEditing] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(null);

    const [modal, setModal] = React.useState(false);
    const [izbranSkrbnik, setIzbranSkrbnik] = React.useState(null);

    const [addModal, setAddModal] = React.useState(false);

    let key = 0;

    React.useEffect(() => {
        axios.get(`/api/skrbnik`)
            .then((res) => {
                const skrbniki = res.data;
                setSeznamSkrbnikov(skrbniki);
            });
    }, []);

    const handleChangeIme = event => {
        setIme(event.target.value);
    }

    const handleChangePriimek = event => {
        setPriimek(event.target.value);
    }

    const handleChangeUporabniskoIme = event => {
        setUporabniskoIme(event.target.value);
    }

    const handleAddSkrbnik = event => {
        event.preventDefault();
        
        if (editing) {
            if (ime && priimek && uporabniskoIme) {
                let seznam = [ ...seznamSkrbnikov ];
                
                let skrbnik = {
                    ime: ime,
                    priimek: priimek,
                    uporabniskoIme: uporabniskoIme,
                }
                
                axios.put(`/api/skrbnik/${seznam[editIndex].id}`, skrbnik).then(function() {
                    axios.get(`/api/skrbnik`)
                        .then((res) => {
                            const skrbniki = res.data;
                            setSeznamSkrbnikov(skrbniki);
                        });
    
                    setAddModal(false);
    
                    setTimeout(function() {
                        //  Reset input fields
                        setIme("");
                        setPriimek("");
                        setUporabniskoIme("");
            
                        //  Reset editing status
                        setEditIndex(null);
                        setEditing(false);
                    }, 500);
                });
            }
        } else {
            if (ime && priimek && uporabniskoIme) {
                let novSkrbnik = {
                    ime: ime,
                    priimek: priimek,
                    uporabniskoIme: uporabniskoIme,
                }

                axios.post(`/api/skrbnik`, novSkrbnik).then(function() {
                    axios.get(`/api/skrbnik`)
                        .then((res) => {
                            const skrbniki = res.data;
                            setSeznamSkrbnikov(skrbniki);
                        });
    
                    setAddModal(false);
    
                    setTimeout(function() {
                        //  Reset input fields
                        setIme("");
                        setPriimek("");
                        setUporabniskoIme("");
                    }, 500);
                });
            }
        }
    }

    const handleEditSkrbnik = (el, e) => {
        e.preventDefault();
        
        let seznam = [ ...seznamSkrbnikov ];
        let index = seznam.indexOf(el);

        setIme(el.ime);
        setPriimek(el.priimek);
        setUporabniskoIme(el.uporabniskoIme);

        setEditIndex(index);
        setEditing(true);

        setAddModal(true);
    }

    const handleCancel = () => {
        setAddModal(false);

        setTimeout(function() {
            //  Reset input fields
            setIme("");
            setPriimek("");
            setUporabniskoIme("");

            //  Reset editing status
            setEditIndex(null);
            setEditing(false);
        }, 500);
    }

    const handleRemoveModal = (el, e) => {
        setModal(true);
        setIzbranSkrbnik(el);
    }

    const handleRemoveSkrbnik = () => {
        let seznam = [ ...seznamSkrbnikov ];
        let index = seznam.indexOf(izbranSkrbnik);

        axios.delete(`/api/skrbnik/${seznam[index].id}`).then(function() {
            axios.get(`/api/skrbnik`)
                .then((res) => {
                    const skrbniki = res.data;
                    setSeznamSkrbnikov(skrbniki);
                });

            setModal(false);
        });
    }

    const handleAddModal = () => {
        setAddModal(true);
    }

    const tableRow = (el) => {
        return (
            <tr key={key++}>
                <th scope="row">
                    <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                                {el.ime + " " + el.priimek}
                            </span>
                    </Media>
                </th>
                <td>{el.uporabniskoIme}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" href="#pablo" role="button" ize="sm" color="" onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={(e) => handleEditSkrbnik(el, e)}> Uredi </DropdownItem>
                            <DropdownItem className="text-red" onClick={(e) => handleRemoveModal(el, e)}> Odstrani </DropdownItem>
                            <Modal className="modal-dialog-centered modal-danger" contentClassName="bg-gradient-danger" isOpen={modal} toggle={() => { return null; }}>
                                <div className="modal-header">
                                    <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => { setModal(false); }}>
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="py-3 text-center">
                                        <i className="ni ni-bell-55 ni-3x" />
                                        <h4 className="heading mt-4">Pozor!</h4>
                                        <p>
                                            Ali res želite odstraniti izbranega skrbnika ({izbranSkrbnik ? izbranSkrbnik.ime + " " + izbranSkrbnik.priimek : null})?
                                        </p>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Button className="btn-white" color="default" type="button" onClick={handleRemoveSkrbnik}>
                                        Da
                                    </Button>
                                    <Button className="text-white ml-auto" color="link" data-dismiss="modal" type="button" onClick={() => { setModal(false); }}>
                                        Ne
                                    </Button>
                                </div>
                            </Modal>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Container style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col>
                                        <h3 className="mb-0">Skrbniki</h3>    
                                    </Col>
                                    <Col>
                                        <Button color="danger" type="button" size="sm" onClick={handleAddModal} style={{ float: "right" }}>Dodaj</Button>
                                        <Modal isOpen={addModal} toggle={() => { return null; }}>
                                            <Card className="shadow bg-secondary">
                                                <CardHeader>
                                                    <Row>
                                                        <Col>
                                                            <h3 className="mb-0">{editing ? "Uredi podatke" : "Dodaj skrbnika"}</h3>    
                                                        </Col>
                                                        <Col>
                                                            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={handleCancel}>
                                                                <span aria-hidden={true}>×</span>
                                                            </button>
                                                        </Col>
                                                    </Row>
                                                </CardHeader>
                                                <CardBody>
                                                    <Form role="form" onSubmit={(e) => handleAddSkrbnik(e)}>
                                                        <FormGroup className="mb-3">
                                                            <label className="form-control-label"htmlFor="input-nameS"> Ime* </label>
                                                            <Input id="input-nameS" className="form-control-alternative" type="text" onChange={handleChangeIme} value={ime} required />
                                                        </FormGroup>
                                                        <FormGroup className="mb-3">
                                                            <label className="form-control-label"htmlFor="input-surnameS"> Priimek* </label>
                                                            <Input id="input-surnameS" className="form-control-alternative" type="text"onChange={handleChangePriimek} value={priimek} required />
                                                        </FormGroup>
                                                        <FormGroup className="mb-3">
                                                            <label className="form-control-label" htmlFor="input-uporabniskoIme"> Uporabniško ime* </label>
                                                            <Input id="input-uporabniskoIme"className="form-control-alternative" type="text"onChange={handleChangeUporabniskoIme} value={uporabniskoIme} required />                                                      
                                                        </FormGroup>
                                                        <div className="text-center">
                                                            <Button color="danger" type="submit">{editing ? "Uredi" : "Dodaj"}</Button>
                                                            {editing ? <Button color="light" type="button" onClick={handleCancel}>Preklic</Button> : null}
                                                        </div>
                                                    </Form>
                                                </CardBody>
                                            </Card>
                                        </Modal>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col"> Ime in priimek </th>
                                        <th scope="col"> Uporabniško ime </th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {seznamSkrbnikov.map((el) => tableRow(el))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Skrbniki;