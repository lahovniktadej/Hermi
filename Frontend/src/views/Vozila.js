import React from 'react';
import axios from 'axios';

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
} from "reactstrap";

import Header from 'components/Headers/Header';

function Vozila() {
    const [naziv, setNaziv] = React.useState("");
    const [registrska, setRegistrska] = React.useState("");
    const [seznamVozil, setSeznamVozil] = React.useState([]);

    const [editing, setEditing] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(null);

    const [modal, setModal] = React.useState(false);
    const [izbranoVozilo, setIzbranoVozilo] = React.useState(null);

    const [addModal, setAddModal] = React.useState(false);

    React.useEffect(() => {
        axios.get(`/api/vozilo`)
            .then((res) => {
                const vozila = res.data;
                setSeznamVozil(vozila);
            });
    }, []);

    const handleChangeNaziv = event => {
        setNaziv(event.target.value);
    }

    const handleChangeRegistrska = event => {
        setRegistrska(event.target.value);
    }

    const handleAddVozilo = () => {
        if (editing) {
            if (naziv) {
                let seznam = [ ...seznamVozil ];

                let vozilo = {
                    naziv: naziv,
                    registrskaStevilka: registrska ? registrska : null,
                };

                axios.put(`/api/vozilo/${seznam[editIndex].id}`, vozilo).then();

                seznam[editIndex] = vozilo;
                setSeznamVozil(seznam);

                setAddModal(false);

                setTimeout(function() {
                    //  Reset input fields
                    setNaziv("");
                    setRegistrska("");

                    //  Reset editing status
                    setEditIndex(null);
                    setEditing(false);
                }, 500);
            }
        } else {
            if (naziv) {
                let novoVozilo = {
                    naziv: naziv,
                    registrskaStevilka: registrska ? registrska : null,
                };

                axios.post(`/api/vozilo`, novoVozilo).then();
    
                let seznam = [ ...seznamVozil ];
                seznam.push(novoVozilo);
                setSeznamVozil(seznam);

                setAddModal(false);

                setTimeout(function() {
                    //  Reset input fields
                    setNaziv("");
                    setRegistrska("");
                }, 500);
            } else {
                //  TO-DO 
                //  Error notification
            }
        }
    }

    const handleEditVehicle = (el, e) => {
        e.preventDefault();

        let seznam = [ ...seznamVozil ];
        let index = seznam.indexOf(el);

        setNaziv(el.naziv);
        setRegistrska(el.registrskaStevilka);

        setEditIndex(index);
        setEditing(true);

        setAddModal(true);
    }

    const handleCancel = () => {
        setAddModal(false);

        setTimeout(function() {
            //  Reset input fields
            setNaziv("");
            setRegistrska("");

            //  Reset editing status
            setEditIndex(null);
            setEditing(false);
        }, 500);
    }

    const handleRemoveModal = (el, e) => {
        setModal(true);
        setIzbranoVozilo(el);
    }

    const handleRemoveVehicle = () => {
        let seznam = [ ...seznamVozil ];
        let index = seznam.indexOf(izbranoVozilo);

        axios.delete(`/api/vozilo/${seznam[index].id}`).then();

        seznam.splice(index, 1);
        setSeznamVozil(seznam);
        setModal(false);
    }

    const handleAddModal = () => {
        setAddModal(true);
    }

    const tableRow = (el) => {
        return (
            <tr>
                <th scope="row">
                    <Media className="align-items-center">
                        <span className="mb-0 text-sm">
                            {el.naziv}
                        </span>
                    </Media>
                </th>
                <td>{el.registrskaStevilka}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" href="#pablo" role="button" size="sm" color="" onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={(e) => handleEditVehicle(el, e)}> Uredi </DropdownItem>
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
                                            Ali res želite odstraniti izbrano vozilo ({izbranoVozilo ? izbranoVozilo.naziv : null})?
                                        </p>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Button className="btn-white" color="default" type="button" onClick={handleRemoveVehicle}>
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
            <Header />
            <Container className="management-card">
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col>
                                        <h3 className="mb-0">Seznam vozil</h3>                                
                                    </Col>
                                    <Col>
                                        <Button color="danger" type="button" size="sm" onClick={handleAddModal} style={{ float: "right" }}>Dodaj</Button>
                                        <Modal isOpen={addModal} toggle={() => { return null; }}>
                                            <CardHeader>
                                                <Row>
                                                    <Col>
                                                        <h3 className="mb-0">{editing ? "Uredi podatke" : "Dodaj vozilo"}</h3>    
                                                    </Col>
                                                    <Col>
                                                        <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={handleCancel}>
                                                            <span aria-hidden={true}>×</span>
                                                        </button>
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                <Form role="form">
                                                    <FormGroup className="mb-3">
                                                        <label className="form-control-label" htmlFor="input-naziv">Naziv vozila:</label>
                                                        <Input id="input-naziv" className="form-control-alternative" type="text" onChange={handleChangeNaziv} value={naziv} />
                                                    </FormGroup>
                                                    <FormGroup className="mb-3">
                                                        <label className="form-control-label" htmlFor="input-regNumber"> Registrska stevilka:</label>
                                                        <Input id="input-regNumber" className="form-control-alternative" type="text" onChange={handleChangeRegistrska} value={registrska} />
                                                    </FormGroup>
                                                    <div className="text-center">
                                                        <Button color="danger" type="button" onClick={handleAddVozilo}>{editing ? "Uredi" : "Dodaj"}</Button>
                                                        {editing ? <Button color="light" type="button" onClick={handleCancel}>Preklic</Button> : null}
                                                    </div>
                                                </Form>
                                            </CardBody>
                                        </Modal>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Naziv vozila</th>
                                        <th scope="col">Registrska stevilka</th>
                                        <th scope="col"/>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seznamVozil.map((el) => tableRow(el))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Vozila;