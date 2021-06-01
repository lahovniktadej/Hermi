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
} from "reactstrap";

import Header from 'components/Headers/Header';

import axios from 'axios';

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

    let key = 0;

    React.useEffect(() => {
        axios.get(`/api/delavec`)
            .then((res) => {
                const delavci = res.data;
                setSeznamDelavcev(delavci);
            });
    }, []);

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
        if (editing) {
            if (ime && priimek) {
                let seznam = [...seznamDelavcev];

                let delavec = {
                    ime: ime,
                    priimek: priimek,
                    telefonskaStevilka: telefon,
                }

                axios.put(`/api/delavec/${seznam[editIndex].id}`, delavec).then();

                seznam[editIndex] = delavec;
                setSeznamDelavcev(seznam);

                setAddModal(false);

                setTimeout(function() {
                    //  Reset input fields
                    setIme("");
                    setPriimek("");
                    setTelefon("");

                    //  Reset editing status
                    setEditIndex(null);
                    setEditing(false);
                }, 500);
            }
        } else {
            if (ime && priimek) {
                let novDelavec = {
                    ime: ime,
                    priimek: priimek,
                    telefonskaStevilka: telefon,
                }

                axios.post(`/api/delavec`, novDelavec).then();

                let seznam = [...seznamDelavcev];
                seznam.push(novDelavec);
                setSeznamDelavcev(seznam);

                setAddModal(false);

                setTimeout(function() {
                    //  Reset input fields
                    setIme("");
                    setPriimek("");
                    setTelefon("");
                }, 500);
            } else {
                //  TO-DO 
                //  Error notification
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

        setTimeout(function() {
            //  Reset input fields
            setIme("");
            setPriimek("");
            setTelefon("");

            //  Reset editing status
            setEditIndex(null);
            setEditing(false);
        }, 500);
    }

    const handleRemoveModal = (el, e) => {
        setModal(true);
        setIzbranDelavec(el);
    }

    const handleRemoveDelavec = () => {
        let seznam = [...seznamDelavcev];
        let index = seznam.indexOf(izbranDelavec);

        axios.delete(`/api/delavec/${seznam[index].id}`).then();

        seznam.splice(index, 1);
        setSeznamDelavcev(seznam);
        setModal(false);
        setIzbranDelavec(null);
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
                <td>{el.telefonskaStevilka}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color="" onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={(e) => handleEditDelavec(el, e)}> Uredi </DropdownItem>
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
                                            Ali res želite odstraniti izbranega delavca ({izbranDelavec ? izbranDelavec.ime + " " + izbranDelavec.priimek : null})?
                                        </p>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <Button className="btn-white" color="default" type="button" onClick={handleRemoveDelavec}>
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
            <Container className="mt--7" fluid>
                <h1>Delavci</h1>
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col>
                                        <h3 className="mb-0">Seznam delavcev</h3>
                                    </Col>
                                    <Col>
                                        <Button color="danger" type="button" size="sm" onClick={handleAddModal} style={{ float: "right" }}>Dodaj</Button>
                                        <Modal isOpen={addModal} toggle={() => { return null; }}>
                                            <Card className="shadow bg-secondary">
                                                <CardHeader>
                                                    <Row>
                                                        <Col>
                                                            <h3 className="mb-0">{editing ? "Uredi podatke" : "Dodaj delavca"}</h3>    
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
                                                            <label className="form-control-label" htmlFor="input-nameD"> Ime </label>
                                                            <Input id="input-nameD" className="form-control-alternative" type="text" onChange={handleChangeIme} value={ime} required />
                                                        </FormGroup>
                                                        <FormGroup className="mb-3">
                                                            <label className="form-control-label" htmlFor="input-nameD"> Priimek </label>
                                                            <Input
                                                                id="input-surnameD" className="form-control-alternative" type="text" onChange={handleChangePriimek} value={priimek} required />
                                                        </FormGroup>
                                                        <FormGroup className="mb-3">
                                                            <label className="form-control-label" htmlFor="input-phone"> Telefon</label>
                                                            <Input id="input-phone" className="form-control-alternative" type="text" onChange={handleChangeTelefon} value={telefon} />
                                                        </FormGroup>
                                                        <div className="text-center">
                                                            <Button color="danger" type="button" onClick={handleAddDelavec}>{editing ? "Uredi" : "Dodaj"}</Button>
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
                                        <th scope="col">Ime in priimek</th>
                                        <th scope="col">Telefon</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {seznamDelavcev.map((el) => tableRow(el))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Delavci;