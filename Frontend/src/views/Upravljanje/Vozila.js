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
    Row,
    Col,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Button,
    Modal,
    FormText,
} from "reactstrap";

import axios from 'axios';
import DeleteModal from 'views/common/DeleteModal';
import PaginationStrip from 'views/common/PaginationStrip';

function Vozila() {
    const [naziv, setNaziv] = React.useState("");
    const [registrska, setRegistrska] = React.useState("");
    const [seznamVozil, setSeznamVozil] = React.useState([]);

    const [editing, setEditing] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(null);

    const [modal, setModal] = React.useState(false);
    const [izbranoVozilo, setIzbranoVozilo] = React.useState(null);

    const [addModal, setAddModal] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const [totalPages, setTotalPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(5);

    let key = 0;

    React.useEffect(() => {
        axios.get(`/api/vozilo`, { params: { page: 0, perPage: perPage } })
            .then((res) => {
                const vozila = res.data.content;
                setTotalPages(res.data.totalPages);
                setSeznamVozil(vozila);
            });
    }, [perPage]);

    const handleChangeNaziv = event => {
        setNaziv(event.target.value);
    }

    const handleChangeRegistrska = event => {
        setRegistrska(event.target.value);
    }

    const handleAddVozilo = event => {
        event.preventDefault();

        if (editing) {
            if (naziv) {
                let seznam = [...seznamVozil];

                let vozilo = {
                    naziv: naziv,
                    registrskaStevilka: registrska ? registrska : null,
                    spremenil: sessionStorage.getItem("user_uid")
                };

                axios.put(`/api/vozilo/${seznam[editIndex].id}`, vozilo).then(function () {
                    axios.get(`/api/vozilo`)
                        .then((res) => {
                            const vozila = res.data;
                            setSeznamVozil(vozila);
                        });

                    setAddModal(false);

                    setTimeout(function () {
                        //  Reset input fields
                        setNaziv("");
                        setRegistrska("");

                        //  Reset editing status
                        setEditIndex(null);
                        setEditing(false);
                    }, 500);
                }).catch((error) => {
                    setIsError(true);
                });
            }
        } else {
            if (naziv) {
                let novoVozilo = {
                    naziv: naziv,
                    registrskaStevilka: registrska ? registrska : null,
                    spremenil: sessionStorage.getItem("user_uid")
                };

                axios.post(`/api/vozilo`, novoVozilo).then(function () {
                    axios.get(`/api/vozilo`)
                        .then((res) => {
                            const vozila = res.data;
                            setSeznamVozil(vozila);
                        });
    
                    setAddModal(false);

                    setTimeout(function () {
                        //  Reset input fields
                        setNaziv("");
                        setRegistrska("");
                    }, 500);
                }).catch((error) => {
                    setIsError(true);
                });
            }
        }
    }

    const handleEditVehicle = (el, e) => {
        e.preventDefault();

        let seznam = [...seznamVozil];
        let index = seznam.indexOf(el);

        setNaziv(el.naziv);
        setRegistrska(el.registrskaStevilka);

        setEditIndex(index);
        setEditing(true);

        setAddModal(true);
    }

    const handleCancel = () => {
        setAddModal(false);

        setTimeout(function () {
            //  Reset input fields
            setNaziv("");
            setRegistrska("");

            //  Reset editing status
            setEditIndex(null);
            setEditing(false);

            //  Reset error status
            setIsError(false);
        }, 500);
    }

    const handleRemoveModal = (el, e) => {
        setModal(true);
        setIzbranoVozilo(el);
    }

    const handleRemoveVehicle = () => {
        let seznam = [...seznamVozil];
        let index = seznam.indexOf(izbranoVozilo);

        axios.delete(`/api/vozilo/${seznam[index].id}`).then(function () {
            axios.get(`/api/vozilo`)
                .then((res) => {
                    const vozila = res.data;
                    setSeznamVozil(vozila);
                });

            setModal(false);
        });
    }

    const handleAddModal = () => {
        setAddModal(true);
    }

    const changePage = (page) => {
        axios.get(`/api/vozilo`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const vozila = res.data.content;
                setTotalPages(res.data.totalPages);
                setSeznamVozil(vozila);
            });
    }

    const tableRow = (el) => {
        return (
            <tr key={key++}>
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
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    };

    return (
        <Card className="shadow">
            <CardHeader className="border-0">
                <Row>
                    <Col>
                        <h3 className="mb-0">Vozila</h3>
                    </Col>
                    <Col className="text-right">
                        <UncontrolledDropdown direction="left">
                            <DropdownToggle size="sm">
                                <span>Št. na stran: {perPage}</span>
                                <i class="fas fa-caret-down"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => setPerPage(5)}>5</DropdownItem>
                                <DropdownItem onClick={() => setPerPage(10)}>10</DropdownItem>
                                <DropdownItem onClick={() => setPerPage(15)}>15</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Button color="danger" type="button" size="sm" onClick={handleAddModal}>Dodaj</Button>
                        <Modal className="modal-dialog-centered" isOpen={addModal} toggle={handleCancel}>
                            <div className="modal-header">
                                <h6 className="heading">{editing ? "Uredi podatke" : "Dodaj vozilo"}</h6>
                                <Button className="close" color="" onClick={handleCancel}>
                                    <i class="fas fa-times"></i>
                                </Button>
                            </div>
                            <Form onSubmit={handleAddVozilo}>
                                <div className="modal-body bg-secondary">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-naziv">Naziv vozila*</label>
                                        <Input id="input-naziv" className="form-control-alternative" type="text" onChange={handleChangeNaziv} value={naziv} required />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-regNumber">Registrska številka</label>
                                        <Input id="input-regNumber" className="form-control-alternative" type="text" onChange={handleChangeRegistrska} value={registrska} />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <FormText color="danger">
                                            {isError ? "Pri izvedbi je prišlo do nepričakovane napake. Prosimo, poskusite znova." : ""}
                                        </FormText>
                                    </FormGroup>
                                </div>
                                <div className="modal-footer text-center">
                                    <Button color="danger" type="submit">{editing ? "Uredi" : "Dodaj"}</Button>
                                    {editing ? <Button color="light" type="button" onClick={handleCancel}>Preklic</Button> : null}
                                </div>
                            </Form>
                        </Modal>
                    </Col>
                </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Naziv vozila</th>
                        <th scope="col">Registrska številka</th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    {seznamVozil ? seznamVozil.map((el) => tableRow(el)) : null}
                </tbody>
            </Table>
            {
                (totalPages > 1) ? (
                    <CardFooter>
                        <PaginationStrip onChange={changePage} totalPages={totalPages} />
                    </CardFooter>
                ) : <></>
            }
            <DeleteModal state={modal} toggle={() => { setModal(false); }} onSubmit={handleRemoveVehicle} text={"Ali res želite odstraniti izbrano vozilo" + ((izbranoVozilo) ? ` (${izbranoVozilo.naziv})` : "") + "?"} />
        </Card>
    );
}

export default Vozila;