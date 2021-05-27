import React, {useEffect, useState} from 'react';

import {
    Card,
    CardHeader,
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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
} from "reactstrap";

import Header from 'components/Headers/Header';
import Ekipe from 'views/Ekipe';

const data = [
    {
        sifra: "sifra",
        naziv: "naziv",
        objekt: "objekt1",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "koncano"
    },
    {
        sifra: "sifra",
        naziv: "naziv",
        objekt: "objekt2",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "nekoncano"
    },
    {
        sifra: "sifra",
        naziv: "naziv",
        objekt: "objekt3",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "koncano"
    },
    {
        sifra: "sifra",
        naziv: "naziv",
        objekt: "objekt4",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "nekoncano"
    },
    {
        sifra: "sifra",
        naziv: "naziv",
        objekt: "objekt5",
        zacetek: "zacetniDatum",
        konec: "koncniDatum",
        status: "koncano"
    },
];

function Nalogi() {

    const [objekt, setObjekt] = useState();
    const [sifra, setSifra] = useState();

    const [modal, setModal] = useState();

    const toggle = () => setModal(!modal);

    const handleBody = (el) => {
        toggle();
        setObjekt(data.map((podatek)=>{ if(podatek === el){return(el.objekt);} else return null;}));
        setSifra(data.map((podatek)=>{ if(podatek === el){return(el.sifra);} else return null;}));
    }

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
                <td>{el.objekt}</td>
                <td>{el.zacetek}</td>
                <td>{el.konec}</td>
                <td>{(el.status==="nekoncano")? <i className="fas fa-ban text-red"></i> : <i className="ni ni-check-bold text-green"></i>}</td>
                <td>
                    {(el.status==="nekoncano") ? <Button size="sm" color="secondary" onClick={function(){ handleBody(el);}}>Dodaj ekipo</Button> : <></>}
                    <Modal isOpen={modal} toggle={toggle} size="lg">
                        <ModalHeader toggle={toggle}><h2>Dodaj ekipo</h2></ModalHeader>
                        <ModalBody> 
                            Šifra delovnega naloga:<b> {sifra}</b> <br/>
                            Objekt delovnega naloga:<b> {objekt}</b> <br/>
                            <hr/>    
                            <Ekipe></Ekipe>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={toggle}>Zapri</Button>
                        </ModalFooter>
                    </Modal>
                </td>

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
                                        <th scope="col">Objekt</th>
                                        <th scope="col">Zacetek</th>
                                        <th scope="col">Konec</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Dodaj ekipo</th>
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