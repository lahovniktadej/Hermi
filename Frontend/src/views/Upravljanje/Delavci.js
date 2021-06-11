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

function Delavci() {
    const [ime, setIme] = React.useState("");
    const [priimek, setPriimek] = React.useState("");
    const [telefon, setTelefon] = React.useState("");
    const [seznamDelavcev, setSeznamDelavcev] = React.useState([]);

    const [editing, setEditing] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(null);

    const [modal, setModal] = React.useState(false);
    const [izbranDelavec, setIzbranDelavec] = React.useState(null);

    const [addModal, setAddModal] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const [totalPages, setTotalPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(5);

    let key = 0;

    React.useEffect(() => {
        axios.get(`/api/delavec`, { params: { page: 0, perPage: perPage } })
            .then((res) => {
                const delavci = res.data.content;
                setTotalPages(res.data.totalPages);
                setSeznamDelavcev(delavci);
            });
    }, [perPage]);

    const handleChangeIme = event => {
        setIme(event.target.value);
    }

    const handleChangePriimek = event => {
        setPriimek(event.target.value);
    }

    const handleChangeTelefon = event => {
        setTelefon(event.target.value);
    }

    const handleAddDelavec = event => {
        event.preventDefault();

        if (editing) {
            if (ime && priimek) {
                let seznam = [...seznamDelavcev];

                let delavec = {
                    ime: ime,
                    priimek: priimek,
                    telefonskaStevilka: telefon,
                }

                axios.put(`/api/delavec/${seznam[editIndex].id}`, delavec).then(function () {
                    axios.get(`/api/delavec`)
                        .then((res) => {
                            const delavci = res.data;
                            setSeznamDelavcev(delavci);
                        });

                    let novLog={
                        timeStamp:new Date(),
                        sprememba:"Spremenjen delavec",
                        originalniPodatki:JSON.stringify({ime: seznam[editIndex].ime, priimek: seznam[editIndex].priimek,  telefonskaStevilka: seznam[editIndex].telefonskaStevilka,}),
                        noviPodatki:JSON.stringify(delavec),
                        emailSkrbnika:sessionStorage.getItem("user_uid")
                    }
                    axios.post(`/api/logger`, novLog).then();

                    setAddModal(false);

                    setTimeout(function () {
                        //  Reset input fields
                        setIme("");
                        setPriimek("");
                        setTelefon("");

                        //  Reset editing status
                        setEditIndex(null);
                        setEditing(false);
                    }, 500);
                }).catch((error) => {
                    setIsError(true);
                });
            }
        } else {
            if (ime && priimek) {
                let novDelavec = {
                    ime: ime,
                    priimek: priimek,
                    telefonskaStevilka: telefon,
                }

                axios.post(`/api/delavec`, novDelavec).then(function () {
                    axios.get(`/api/delavec`)
                        .then((res) => {
                            const delavci = res.data;
                            setSeznamDelavcev(delavci);
                        });
                    let novLog={
                        timeStamp:new Date(),
                        sprememba:"Dodan delavec",
                        originalniPodatki:"/",
                        noviPodatki:JSON.stringify(novDelavec),
                        emailSkrbnika:sessionStorage.getItem("user_uid")
                    }
                    axios.post(`/api/logger`, novLog).then();

                    setAddModal(false);

                    setTimeout(function () {
                        //  Reset input fields
                        setIme("");
                        setPriimek("");
                        setTelefon("");
                    }, 500);
                }).catch((error) => {
                    setIsError(true);
                });
            }
        }
    }

    const handleEditDelavec = (el, e) => {
        e.preventDefault();

        let seznam = [...seznamDelavcev];
        let index = seznam.indexOf(el);

        setIme(el.ime);
        setPriimek(el.priimek);
        setTelefon(el.telefonskaStevilka);

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
            setTelefon("");

            //  Reset editing status
            setEditIndex(null);
            setEditing(false);

            //  Reset error status
            setIsError(false);
        }, 500);
    }

    const handleRemoveModal = (el, e) => {
        setModal(true);
        setIzbranDelavec(el);
    }

    const handleRemoveDelavec = () => {
        let seznam = [...seznamDelavcev];
        let index = seznam.indexOf(izbranDelavec);

        axios.delete(`/api/delavec/${seznam[index].id}`).then(function () {
            axios.get(`/api/delavec`)
                .then((res) => {
                    const delavci = res.data;
                    setSeznamDelavcev(delavci);
                });
            let novLog={
                timeStamp:new Date(),
                sprememba:"Izbrisan delavec",
                originalniPodatki:JSON.stringify(izbranDelavec),
                noviPodatki:"/",
                emailSkrbnika:sessionStorage.getItem("user_uid")
            }
            axios.post(`/api/logger`, novLog).then();

            setModal(false);
            setIzbranDelavec(null);
        });
    }

    const handleAddModal = () => {
        setAddModal(true);
    }

    const changePage = (page) => {
        axios.get(`/api/delavec`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const delavci = res.data.content;
                setTotalPages(res.data.totalPages);
                setSeznamDelavcev(delavci);
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
                <td>{el.telefonskaStevilka}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color="" onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={(e) => handleEditDelavec(el, e)}> Uredi </DropdownItem>
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
                        <h3 className="mb-0">Delavci</h3>
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
                                <h6 className="heading">{editing ? "Uredi podatke" : "Dodaj delavca"}</h6>
                                <Button className="close" color="" onClick={handleCancel}>
                                    <i class="fas fa-times"></i>
                                </Button>
                            </div>
                            <Form onSubmit={handleAddDelavec}>
                                <div className="modal-body bg-secondary">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-nameD">Ime*</label>
                                        <Input id="input-nameD" className="form-control-alternative" type="text" onChange={handleChangeIme} value={ime} required />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-nameD">Priimek*</label>
                                        <Input id="input-surnameD" className="form-control-alternative" type="text" onChange={handleChangePriimek} value={priimek} required />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-phone">Telefon</label>
                                        <Input id="input-phone" className="form-control-alternative" type="text" onChange={handleChangeTelefon} value={telefon} />
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
                        <th scope="col">Ime in priimek</th>
                        <th scope="col">Telefon</th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    {seznamDelavcev.map((el) => tableRow(el))}
                </tbody>
            </Table>
            {
                (totalPages > 1) ? (
                    <CardFooter>
                        <PaginationStrip onChange={changePage} totalPages={totalPages} />
                    </CardFooter>
                ) : <></>
            }
            <DeleteModal state={modal} toggle={() => { setModal(false); }} onSubmit={handleRemoveDelavec} text={"Ali res želite odstraniti izbranega delavca" + ((izbranDelavec) ? ` (${izbranDelavec.ime} ${izbranDelavec.priimek})` : "") + "?"} />
        </Card>
    );
}

export default Delavci;