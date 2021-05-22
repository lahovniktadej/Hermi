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
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20"

    },
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20"

    },
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20"
    },
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20"

    },
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20"

    },
];

function Ekipe() {

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
                <td>{el.datum}</td>
                <td>{el.avto}</td>
                <td>{el.sofer}</td>
                <td>{el.delavci}</td>
                <td>{el.start}</td>
                <td>{el.pricetekDela}</td>
                <td>{el.konecDela}</td>
                <td>{el.prihod}</td>
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
                                <h3 className="mb-0">Ekipe, ki so bile vnešene včeraj</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Objekt</th>
                                        <th scope="col">Datum</th>
                                        <th scope="col">Avto</th>
                                        <th scope="col">Šofer</th>
                                        <th scope="col">Delavci</th>
                                        <th scope="col">START</th>
                                        <th scope="col">Pričetek dela</th>
                                        <th scope="col">Konec dela</th>
                                        <th scope="col">PRIHOD</th>
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

export default Ekipe;