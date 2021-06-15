import React, { useState } from 'react';

import {
    Table,
    Card,
    CardHeader,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    CardFooter,
    CardBody,
    Row,
    Col,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import Header from 'components/Headers/Header';
import axios from 'axios';
import PaginationStrip from 'views/common/PaginationStrip';

function Delavci() {
    const [logging, setLogging] = useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(5);

    const [modal, setModal] = useState();
    const [modalBody, setModalBody] = useState();

    const toggle = () => setModal(!modal);

    const handleBody = (el) => {
        toggle();
        setModalBody(handleIzpis(el));
    }


    React.useEffect(() => {
        axios.get(`/api/delavec`, { params: { page: 0, perPage: perPage } })
        .then((res) => {
            const log = res.data.content;
            setTotalPages(res.data.totalPages);
            setLogging(log);
        });
    }, [perPage]);

    const changePage = (page) => {
        axios.get(`/api/delavec`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const log = res.data.content;
                setTotalPages(res.data.totalPages);
                setLogging(log);
            });
    }
    const handleIzpis = (el) => {
        let izpis = logging.map((podatek)=>{
            if(podatek === el){
                return(
                    <>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col>
                                    <label className="form-control-label">
                                        Ime:
                                    </label>
                                    <Input className="form-control-alternative" value={el.ime} type="text" disabled/>
                                </Col>
                                <Col>
                                    <label className="form-control-label bold">
                                        Priimek:
                                    </label>
                                    <Input className="form-control-alternative" value={el.priimek} type="text" disabled />
                                </Col>
                                <Col>
                                    <label className="form-control-label bold">
                                        Telefonska številka:
                                    </label>
                                    <Input className="form-control-alternative" value={el.telefonskaStevilka} type="text" disabled />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    </>
                    );
            }
            else return null;
        })
        return izpis;
    }
    const podatki = (el) => {
        return (
            <>
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <label className="form-control-label">
                                Nazadnje spreminjal:
                            </label>
                            <Input className="form-control-alternative" value={el.spremenil} type="text" disabled />
                        </Col>
                        <Col>
                            <label className="form-control-label">
                                Čas spremembe:
                            </label>
                            <Input className="form-control-alternative" value={new Date(el.timestamp).toLocaleString("en-GB")} type="text" disabled/>
                        </Col>
                        <Col>
                            <label className="form-control-label">
                                Tip spremembe:
                            </label>
                            <Input className="form-control-alternative" value={el.operation} type="text" disabled />
                        </Col>
                    </Row><br/>
                    <Button center color="success" onClick={function(){ handleBody(el);}}>Zadnji podatki</Button>
                    <Modal isOpen={modal} toggle={toggle} size="lg">
                        <ModalHeader toggle={toggle}><h2>Podrobnosti</h2></ModalHeader>
                        <ModalBody>
                            {modalBody}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={toggle}>Zapri</Button>
                        </ModalFooter>
                    </Modal>   
                </CardBody>
            </Card>
            </>
        );
    }
    return (
        <>
            <Card className="shadow" size="sm">
            <CardHeader className="border-0">
                <Row>
                    <Col>    
                        <h2 className="mb-0">Delavci</h2>
                    </Col>
                    <Col className="text-right">
                        <UncontrolledDropdown>
                            <CardBody>
                                <DropdownToggle size="sm">
                                    <span>Št. na stran: {perPage}</span>
                                    <i class="fas fa-caret-down"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setPerPage(5)}>5</DropdownItem>
                                    <DropdownItem onClick={() => setPerPage(10)}>10</DropdownItem>
                                    <DropdownItem onClick={() => setPerPage(15)}>15</DropdownItem>
                                </DropdownMenu>
                            </CardBody>
                        </UncontrolledDropdown>
                    </Col>
                </Row>
                </CardHeader>
                {(logging!=null)?logging.map((el) => podatki(el)):<></>}
                {
                    (totalPages > 1) ? (
                        <CardFooter>
                            <PaginationStrip onChange={changePage} totalPages={totalPages} />
                        </CardFooter>
                    ) : <></>
                }
            </Card>
        </>
    );
}

export default Delavci;