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
            if (ime && priimek && telefon) {
                let seznam = [...seznamDelavcev];

                let delavec = {
                    ime: ime,
                    priimek: priimek,
                    telefonskaStevilka: telefon,
                }

                axios.put(`/api/delavec/${seznam[editIndex].id}`, delavec).then();

                seznam[editIndex] = delavec;
                setSeznamDelavcev(seznam);

                //  Reset input fields
                setIme("");
                setPriimek("");
                setTelefon("");

                //  Reset editing status
                setEditIndex(null);
                setEditing(false);
            }
        } else {
            if (ime && priimek && telefon) {
                let novDelavec = {
                    ime: ime,
                    priimek: priimek,
                    telefonskaStevilka: telefon,
                }

                axios.post(`/api/delavec`, novDelavec).then();

                let seznam = [...seznamDelavcev];
                seznam.push(novDelavec);
                setSeznamDelavcev(seznam);

                //  Reset input fields
                setIme("");
                setPriimek("");
                setTelefon("");
            } else {
                //  TO-DO 
                //  Error notification
            }
        }
    }

    const handleEditDelavec = (el) => {
        let seznam = [...seznamDelavcev];
        let index = seznam.indexOf(el);

        setIme(el.ime);
        setPriimek(el.priimek);
        setTelefon(el.telefonskaStevilka);

        setEditIndex(index);
        setEditing(true);
    }

    const handleRemoveDelavec = (el) => {
        let seznam = [...seznamDelavcev];
        let index = seznam.indexOf(el);

        axios.delete(`/api/delavec/${seznam[index].id}`).then();

        seznam.splice(index, 1);
        setSeznamDelavcev(seznam);
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
                            <DropdownItem onClick={(e) => handleEditDelavec(el)}> Uredi </DropdownItem>
                            <DropdownItem className="text-red" onClick={() => handleRemoveDelavec(el)}> Odstrani </DropdownItem>
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
                                <h3 className="mb-0">Seznam delavcev</h3>
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
                    <Col className="mb-5">
                        <Card className="shadow bg-secondary">
                            <CardHeader>
                                <h3 className="mb-0">Dodaj delavca</h3>
                            </CardHeader>
                            <CardBody>
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-nameD"> Ime </label>
                                        <Input id="input-nameD" className="form-control-alternative" type="text" onChange={handleChangeIme} value={ime} />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-nameD"> Priimek </label>
                                        <Input
                                            id="input-surnameD" className="form-control-alternative" type="text" onChange={handleChangePriimek} value={priimek} />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-phone"> Telefon</label>
                                        <Input id="input-phone" className="form-control-alternative" type="text" onChange={handleChangeTelefon} value={telefon} />
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button color="danger" type="button" onClick={handleAddDelavec}>{editing ? "Uredi" : "Dodaj"}</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Delavci;