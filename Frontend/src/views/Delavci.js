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
        telefon: "123456789"
    },
    {
        ime: "ime",
        priimek: "priimek",
        telefon: "123456789"
    },
    {
        ime: "ime",
        priimek: "priimek",
        telefon: "123456789"
    },
    {
        ime: "ime",
        priimek: "priimek",
        telefon: "123456789"
    },
    {
        ime: "ime",
        priimek: "priimek",
        telefon: "123456789"
    }
];

function Delavci() {
    const [ime, setIme] = React.useState("");
    const [priimek, setPriimek] = React.useState("");
    const [telefon, setTelefon] = React.useState("");
    const [seznamDelavcev, setSeznamDelavcev] = React.useState(data);

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
        if (ime && priimek && telefon) {
            let novDelavec = {
                ime: ime,
                priimek: priimek,
                telefon: telefon,
            }
    
            let seznam = [ ...seznamDelavcev ];
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

    const handleRemoveDelavec = (el) => {
        let seznam = [ ...seznamDelavcev ];
        let index = seznam.indexOf(el);

        seznam.splice(index, 1);
        setSeznamDelavcev(seznam);
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
                <td>{el.telefon}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" href="#pablo"role="button" size="sm" color="" onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}> Uredi </DropdownItem>
                            <DropdownItem className="text-red" href="#pablo" onClick={() => handleRemoveDelavec(el)}> Odstrani </DropdownItem>
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
                                        <Input 
                                            id="input-nameD" 
                                            className="form-control-alternative" 
                                            type="text" 
                                            onChange={handleChangeIme} 
                                            value={ime} 
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-nameD"> Priimek </label>
                                        <Input 
                                            id="input-surnameD" 
                                            className="form-control-alternative" 
                                            type="text" 
                                            onChange={handleChangePriimek} 
                                            value={priimek} 
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-phone"> Telefon</label>
                                        <Input 
                                            id="input-phone" 
                                            className="form-control-alternative" 
                                            type="text" 
                                            onChange={handleChangeTelefon} 
                                            value={telefon} 
                                        />
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button color="danger" type="button" onClick={handleAddDelavec}>Dodaj</Button>
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