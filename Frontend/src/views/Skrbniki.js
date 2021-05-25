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
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}> Uredi </DropdownItem>
                            <DropdownItem className="text-red" href="#pablo" onClick={(e) => e.preventDefault()}> Odstrani </DropdownItem>
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
                                    {data.map((el) => tableRow(el))}
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
                                        <Input id="input-nameS" className="form-control-alternative" type="text"/>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label"htmlFor="input-surnameS"> Priimek </label>
                                        <Input id="input-surnameS" className="form-control-alternative" type="text"/>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-uporabniskoIme"> Uporabnisko ime </label>
                                        <Input id="input-uporabniskoIme"className="form-control-alternative" type="text"/>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button color="danger" type="button"> Dodaj </Button>
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