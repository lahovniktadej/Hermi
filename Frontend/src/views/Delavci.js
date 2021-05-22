import React from 'react';

import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
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

    const tableRow = (el) => {
        return (
            <tr>
                <th scope="row">
                    <Media className="align-items-center">
                        <img
                            className="avatar rounded-circle mr-3"
                            alt="..."
                            src={
                                require("../assets/img/theme/bootstrap.jpg").default
                            }
                        />
                        <Media>
                            <span className="mb-0 text-sm">
                                {el.ime + " " + el.priimek}
                            </span>
                        </Media>
                    </Media>
                </th>
                <td>{el.telefon}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                Uredi
                            </DropdownItem>
                            <DropdownItem
                                className="text-red"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                Odstrani
                            </DropdownItem>
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
                                    {data.map((el) => tableRow(el))}
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
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-name"
                                        >
                                            Ime in priimek</label>
                                        <Input
                                            id="input-name"
                                            className="form-control-alternative"
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-phone"
                                        >
                                            Telefon</label>
                                        <Input
                                            id="input-phone"
                                            className="form-control-alternative"
                                            type="text"
                                        />
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button color="primary" type="button">Dodaj</Button>
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