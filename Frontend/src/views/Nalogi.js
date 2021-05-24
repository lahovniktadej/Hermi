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
    Col
} from "reactstrap";

import Header from 'components/Headers/Header';

const data = [
    {
        sifra: "sifra",
        naziv: "naziv",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "koncano"
    },
    {
        sifra: "sifra",
        naziv: "naziv",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "nekoncano"
    },
    {
        sifra: "sifra",
        naziv: "naziv",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "koncano"
    },
    {
        sifra: "sifra",
        naziv: "naziv",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "nekoncano"
    },
    {
        sifra: "sifra",
        naziv: "naziv",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "koncano"
    },
];

function Nalogi() {

    const tableRow = (el) => {
        return (
            <tr>
                <th scope="row">
                    <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                                {el.sifra}
                            </span>
                    </Media>
                </th>
                <td>{el.naziv}</td>
                <td>{el.zacetek}</td>
                <td>{el.konec}</td>
                <td>{el.status}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" href="#pablo" role="button" size="sm" color="" onClick={(e) => e.preventDefault()}>
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
                                <h3 className="mb-0"> Nalogi </h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Sifra</th>
                                        <th scope="col">Naziv</th>
                                        <th scope="col">Zacetek</th>
                                        <th scope="col">Konec</th>
                                        <th scope="col">Status</th>
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

export default Nalogi;