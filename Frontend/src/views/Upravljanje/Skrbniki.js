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
    FormGroup,
    CardFooter,
    Form,
    Input,
    Button,
    Modal,
    FormText,
} from "reactstrap";

import axios from 'axios';
import DeleteModal from 'views/common/DeleteModal';
import PaginationStrip from 'views/common/PaginationStrip';

import firebase from "firebase/app";
import 'firebase/auth';
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import config from "firebase_config";

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

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
    const [isError, setIsError] = React.useState(false);

    const [totalPages, setTotalPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(5);

    let key = 0;

    React.useEffect(() => {
        axios.get(`/api/skrbnik`, { params: { page: 0, perPage: perPage } })
            .then((res) => {
                const skrbniki = res.data.content;
                setTotalPages(res.data.totalPages);
                setSeznamSkrbnikov(skrbniki);
            });
    }, [perPage]);

    const handleChangeIme = event => {
        setIme(event.target.value);
    }

    const handleChangePriimek = event => {
        setPriimek(event.target.value);
    }

    const handleChangeUporabniskoIme = event => {
        setUporabniskoIme(event.target.value);
    }

    const sendPasswordResetEmail = (email) => {
        setTimeout(function () {
            firebase.auth().sendPasswordResetEmail(email).then(function () {
                // Email sent.
            }).catch(function (error) {
                console.log(error);
                // An error happened.
            })
        }, 5000);
    }

    const handleAddSkrbnik = event => {
        event.preventDefault();

        if (editing) {
            if (ime && priimek && uporabniskoIme) {
                let seznam = [...seznamSkrbnikov];

                let skrbnik = {
                    ime: ime,
                    priimek: priimek,
                    uporabniskoIme: uporabniskoIme,
                }

                axios.put(`/api/skrbnik/${seznam[editIndex].id}`, skrbnik).then(function () {
                    axios.get(`/api/skrbnik`)
                        .then((res) => {
                            const skrbniki = res.data;
                            setSeznamSkrbnikov(skrbniki);
                        });

                    setAddModal(false);

                    setTimeout(function () {
                        //  Reset input fields
                        setIme("");
                        setPriimek("");
                        setUporabniskoIme("");

                        //  Reset editing status
                        setEditIndex(null);
                        setEditing(false);
                    }, 500);
                }).catch((error) => {
                    setIsError(true);
                });
            }
        } else {
            if (ime && priimek && uporabniskoIme) {
                let novSkrbnik = {
                    ime: ime,
                    priimek: priimek,
                    uporabniskoIme: uporabniskoIme,
                }

                axios.post(`/api/skrbnik`, novSkrbnik).then(function () {
                    //  Ustvarjanje novega uporabnika in pošiljanje e-poštnega sporočila za ponastavitev gesla
                    firebase.auth().createUserWithEmailAndPassword(uporabniskoIme, Math.floor(Math.random(1000000000) * 9999999999).toString()).then((userCredential) => {
                        let user = userCredential.user;
                    }).then(() => {
                        sendPasswordResetEmail(uporabniskoIme);
                    }).catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    });

                    axios.get(`/api/skrbnik`)
                        .then((res) => {
                            const skrbniki = res.data;
                            setSeznamSkrbnikov(skrbniki);
                        });

                    setAddModal(false);

                    setTimeout(function () {
                        //  Reset input fields
                        setIme("");
                        setPriimek("");
                        setUporabniskoIme("");
                    }, 500);
                }).catch((error) => {
                    setIsError(true);
                });
            }
        }
    }

    const handleEditSkrbnik = (el, e) => {
        e.preventDefault();

        let seznam = [...seznamSkrbnikov];
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

        setTimeout(function () {
            //  Reset input fields
            setIme("");
            setPriimek("");
            setUporabniskoIme("");

            //  Reset editing status
            setEditIndex(null);
            setEditing(false);

            //  Reset error status
            setIsError(false);
        }, 500);
    }

    const handleRemoveModal = (el, e) => {
        setModal(true);
        setIzbranSkrbnik(el);
    }

    const handleRemoveSkrbnik = () => {
        let seznam = [...seznamSkrbnikov];
        let index = seznam.indexOf(izbranSkrbnik);

        axios.delete(`/api/skrbnik/${seznam[index].id}`).then(function () {
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

    const changePage = (page) => {
        axios.get(`/api/skrbnik`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const skrbniki = res.data.content;
                setTotalPages(res.data.totalPages);
                setSeznamSkrbnikov(skrbniki);
            });
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
                        <h3 className="mb-0">Skrbniki</h3>
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
                                <h6 className="heading">{editing ? "Uredi podatke" : "Dodaj skrbnika"}</h6>
                                <Button className="close" color="" onClick={handleCancel}>
                                    <i class="fas fa-times"></i>
                                </Button>
                            </div>
                            <Form onSubmit={handleAddSkrbnik}>
                                <div className="modal-body bg-secondary">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-nameS"> Ime* </label>
                                        <Input id="input-nameS" className="form-control-alternative" type="text" onChange={handleChangeIme} value={ime} required />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-surnameS"> Priimek* </label>
                                        <Input id="input-surnameS" className="form-control-alternative" type="text" onChange={handleChangePriimek} value={priimek} required />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-uporabniskoIme"> E-poštni naslov{editing ? "" : "*" } </label>
                                        <Input id="input-uporabniskoIme" className="form-control-alternative" type="email" onChange={handleChangeUporabniskoIme} value={uporabniskoIme} disabled={editing} required />
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
            </CardHeader >
            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col"> Ime in priimek </th>
                        <th scope="col"> E-poštni naslov </th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    {seznamSkrbnikov ? seznamSkrbnikov.map((el) => tableRow(el)) : null}
                </tbody>
            </Table>
            {
                (totalPages > 1) ? (
                    <CardFooter>
                        <PaginationStrip onChange={changePage} totalPages={totalPages} />
                    </CardFooter>
                ) : <></>
            }
            <DeleteModal state={modal} toggle={() => { setModal(false); }} onSubmit={handleRemoveSkrbnik} text={"Ali res želite odstraniti izbranega skrbnika" + ((izbranSkrbnik) ? ` (${izbranSkrbnik.ime} ${izbranSkrbnik.priimek})` : "") + "?"} />
        </Card >
    );
}

export default Skrbniki;