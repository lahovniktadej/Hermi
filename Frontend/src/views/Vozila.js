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
        naziv: "avto",
        registrskaStevilka: "MB 56 528"
        
    },
    {
        naziv: "avto",
        registrskaStevilka: "MB 56 528"
        
    },
    {
        naziv: "avto",
        registrskaStevilka: "MB 56 528"
        
    },
    {
        naziv: "avto",
        registrskaStevilka: "MB 56 528"
        
    },
    {
        naziv: "avto",
        registrskaStevilka: "MB 56 528"
        
    },
];

function Vozila() {
    const [naziv, setNaziv] = React.useState("");
    const [registrska, setRegistrska] = React.useState("");
    const [seznamVozil, setSeznamVozil] = React.useState(data);

    const handleChangeNaziv = event => {
        setNaziv(event.target.value);
    }

    const handleChangeRegistrska = event => {
        setRegistrska(event.target.value);
    }

    const handleAddVozilo = () => {
        if (naziv && registrska) {
            let novoVozilo = {
                naziv: naziv,
                registrskaStevilka: registrska
            };

            let seznam = [ ...seznamVozil ];
            seznam.push(novoVozilo);
            setSeznamVozil(seznam);

            //  Reset input fields
            setNaziv("");
            setRegistrska("");
        } else {
            //  TO-DO 
            //  Error notification
        }
    }

    const handleRemoveVehicle = (el) => {
        let seznam = [ ...seznamVozil ];
        let index = seznam.indexOf(el);

        seznam.splice(index, 1);
        setSeznamVozil(seznam);
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
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}> Uredi </DropdownItem>
                            <DropdownItem className="text-red" href="#pablo" onClick={() => handleRemoveVehicle(el)}> Odstrani </DropdownItem>
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
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Seznam vozil</h3>
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
                    <Col className="mb-5">
                        <Card className="shadow bg-secondary">
                            <CardHeader>
                                <h3 className="mb-0">Dodaj vozilo</h3>
                            </CardHeader>
                            <CardBody>
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-naziv">Naziv vozila:</label>
                                        <Input 
                                            id="input-naziv" 
                                            className="form-control-alternative" 
                                            type="text"
                                            onChange={handleChangeNaziv}   
                                            value={naziv} 
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-regNumber"> Registrska stevilka:</label>
                                        <Input 
                                            id="input-regNumber" 
                                            className="form-control-alternative" 
                                            type="text"
                                            onChange={handleChangeRegistrska}
                                            value={registrska}
                                        />
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button color="danger" type="button" onClick={handleAddVozilo}> Dodaj</Button>
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

export default Vozila;