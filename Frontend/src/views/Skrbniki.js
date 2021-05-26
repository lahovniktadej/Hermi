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

const data = [
    {
        ime: "ime",
        priimek: "priimek",
        uporabniskoIme: "primer"
    },
    {
        ime: "ime",
        priimek: "priimek",
        uporabniskoIme: "primer"
    },
    {
        ime: "ime",
        priimek: "priimek",
        uporabniskoIme: "primer"
    },
    {
        ime: "ime",
        priimek: "priimek",
        uporabniskoIme: "primer"
    },
    {
        ime: "ime",
        priimek: "priimek",
        uporabniskoIme: "primer"
    },
];

function Skrbniki() {
    const [ime, setIme] = React.useState("");
    const [priimek, setPriimek] = React.useState("");
    const [uporabniskoIme, setUporabniskoIme] = React.useState("");
    const [seznamSkrbnikov, setSeznamSkrbnikov] = React.useState(data);

    const [editing, setEditing] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState(null);

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
        if (editing) {
            if (ime && priimek && uporabniskoIme) {
                let seznam = [ ...seznamSkrbnikov ];
                
                let skrbnik = {
                    ime: ime,
                    priimek: priimek,
                    uporabniskoIme: uporabniskoIme,
                }

                seznam[editIndex] = skrbnik;
                setSeznamSkrbnikov(seznam);

                //  Reset input fields
                setIme("");
                setPriimek("");
                setUporabniskoIme("");

                //  Reset editing status
                setEditIndex(null);
                setEditing(false);
            }
        } else {
            if (ime && priimek && uporabniskoIme) {
                let novSkrbnik = {
                    ime: ime,
                    priimek: priimek,
                    uporabniskoIme: uporabniskoIme,
                }
        
                let seznam = [ ...seznamSkrbnikov ];
                seznam.push(novSkrbnik);
                setSeznamSkrbnikov(seznam);
        
                //  Reset input fields
                setIme("");
                setPriimek("");
                setUporabniskoIme("");
            } else {
                //  TO-DO 
                //  Error notification
            }
        }
    }

    const handleEditSkrbnik = (el) => {
        let seznam = [ ...seznamSkrbnikov ];
        let index = seznam.indexOf(el);

        setIme(el.ime);
        setPriimek(el.priimek);
        setUporabniskoIme(el.uporabniskoIme);

        setEditIndex(index);
        setEditing(true);
    }

    const handleRemoveSkrbnik = (el) => {
        let seznam = [ ...seznamSkrbnikov ];
        let index = seznam.indexOf(el);

        seznam.splice(index, 1);
        setSeznamSkrbnikov(seznam);
    }

    const tableRow = (el) => {
        return (
            <tr>
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
                            <DropdownItem href="#pablo" onClick={(e) => handleEditSkrbnik(el)}> Uredi </DropdownItem>
                            <DropdownItem className="text-red" href="#pablo" onClick={() => handleRemoveSkrbnik(el)}> Odstrani </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Container className={"management-container"} fluid>
                <h1>Skrbniki</h1>
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0"> Seznam skrbnikov</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col"> Ime in priimek </th>
                                        <th scope="col"> Uporabnisko ime </th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {seznamSkrbnikov.map((el) => tableRow(el))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col className="mb-5">
                        <Card className="shadow bg-secondary">
                            <CardHeader>
                                <h3 className="mb-0"> Dodaj skrbnika </h3>
                            </CardHeader>
                            <CardBody>
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label"htmlFor="input-nameS"> Ime </label>
                                        <Input id="input-nameS" className="form-control-alternative" type="text" onChange={handleChangeIme} value={ime}/>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label"htmlFor="input-surnameS"> Priimek </label>
                                        <Input id="input-surnameS" className="form-control-alternative" type="text"onChange={handleChangePriimek} value={priimek}/>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-uporabniskoIme"> Uporabnisko ime </label>
                                        <Input id="input-uporabniskoIme"className="form-control-alternative" type="text"onChange={handleChangeUporabniskoIme} value={uporabniskoIme}/>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button color="danger" type="button" onClick={handleAddSkrbnik}>{editing ? "Uredi" : "Dodaj"}</Button>
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

export default Skrbniki;