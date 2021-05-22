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
        objekt: "objekt",
        avto: "avto",
        sofer: "priimekSoferja",
        delovci: "priimek1, priimek2"

    },
    {
        objekt: "objekt",
        avto: "avto",
        sofer: "priimekSoferja",
        delovci: "priimek1, priimek2"

    },
    {
        objekt: "objekt",
        avto: "avto",
        sofer: "priimekSoferja",
        delovci: "priimek1, priimek2"

    },
    {
        objekt: "objekt",
        avto: "avto",
        sofer: "priimekSoferja",
        delovci: "priimek1, priimek2"

    },
    {
        objekt: "objekt",
        avto: "avto",
        sofer: "priimekSoferja",
        delovci: "priimek1, priimek2"

    },
];

function Analiza() {

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
                                {el.objekt}
                            </span>
                        </Media>
                    </Media>
                </th>
                <td>{el.avto}</td>
                <td>{el.sofer}</td>
                <td>{el.delovci}</td>
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
                                <h3 className="mb-0">Zaključeni nalogi</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Objekt</th>
                                        <th scope="col">Avto</th>
                                        <th scope="col">Sofer</th>
                                        <th scope="col">Delovci</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((el) => tableRow(el))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Analiza;