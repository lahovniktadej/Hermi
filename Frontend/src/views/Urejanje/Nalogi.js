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
    Col,
    Row,
    Input,
    Button, 
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Alert
} from "reactstrap";
import Header from 'components/Headers/Header';
import axios from 'axios';
import PaginationStrip from 'views/common/PaginationStrip';

function Nalogi() {
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
        axios.get(`/api/delovniNalog`, { params: { page: 0, perPage: perPage } })
        .then((res) => {
            const log = res.data.content;
            setTotalPages(res.data.totalPages);
            setLogging(log);
        });
    }, [perPage]);

    const changePage = (page) => {
        axios.get(`/api/delovniNalog`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const log = res.data.content;
                setTotalPages(res.data.totalPages);
                setLogging(log);
            });
    }
    const pridobiStatus = (status) => {
        if(status)
            return "fas fa-circle fa-xs text-green";
        else
            return "fas fa-circle fa-xs text-red";
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
                                    <i className={pridobiStatus(el.status)}></i>
                                    <label className="form-control-label">
                                        &nbsp;&nbsp;Status 
                                    </label>
                                </Col>
                            </Row><br/>
                            <Row>
                                <Col>
                                    <label className="form-control-label bold">
                                        Naziv:
                                    </label>
                                    <Input className="form-control-alternative" value={el.naziv} type="text" disabled />
                                </Col>
                                <Col>
                                    <label className="form-control-label">
                                        Objekt:
                                    </label>
                                    <Input className="form-control-alternative" value={el.objekt} type="text" disabled/>
                                </Col>
                            </Row>
                            <br/><br/>
                            <div className="text-center">
                                <label className="form-control-label">
                                    EKIPE:
                                </label>
                            </div>
                            <hr/>
                            {(el.ekipe!=null)?
                            el.ekipe.map((ekipa)=>
                                <>
                                <Row>
                                <Col>
                                    <label className="form-control-label">
                                        Datum:
                                    </label>
                                    <Input className="form-control-alternative" value={new Date(ekipa.datum).toLocaleString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })} type="text" disabled/>
                                </Col>
                                <Col>
                                    <label className="form-control-label">
                                        Šofer:
                                    </label>
                                    <Input className="form-control-alternative" value={ekipa.sofer.ime +" " + ekipa.sofer.priimek} type="text" disabled/>
                                </Col>
                                <Col>
                                    <label className="form-control-label">
                                        Delavci:
                                    </label>
                                    {ekipa.delavci.map((delavec)=><><Input className="form-control-alternative" value={delavec.ime +" " + delavec.priimek} type="text" disabled/><br/></>)}
                                    <Input className="form-control-alternative" value={ekipa.sofer.ime +" " + ekipa.sofer.priimek} type="text" disabled/>
                                </Col>
                                </Row><hr/>
                                </>)
                            :<>Ni ekip</>}
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
            <Card className="my-2">
                <CardBody>
                    <Row>
                        <Col>
                            <label className="form-control-label bold">
                                Šifra:
                            </label>
                            <Input className="form-control-alternative" value={el.sifra} type="text" disabled />
                        </Col>
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
                </CardBody>
            </Card>
            </>
        );
    };

    const ModalPodrobnosti = () => {
        return (
            <Modal className="modal-dialog-centered" isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}><h2>Podrobnosti</h2></ModalHeader>
                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Zapri</Button>
                </ModalFooter>
            </Modal>
        );
    }

    return (
        <>
            <Card className="shadow">
            <CardHeader className="border-0">
                <Row className="align-items-center">
                    <Col>    
                        <h3 className="mb-0">Nalogi</h3>
                    </Col>
                    <Col className="text-right">
                        <UncontrolledDropdown direction="left">
                                <DropdownToggle size="sm">
                                    <span>Št. na stran: {perPage}</span>
                                    <i class="fas fa-caret-down"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setPerPage(5)}>5</DropdownItem>
                                    <DropdownItem onClick={() => setPerPage(10)}>10</DropdownItem>
                                    <DropdownItem onClick={() => setPerPage(15)}>15</DropdownItem>
                                </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                </Row>
                </CardHeader>
                <CardBody className="bg-secondary">
                    {(logging!=null)?logging.map((el) => podatki(el)):<></>}
                </CardBody>
                {
                    (totalPages > 1) ? (
                        <CardFooter>
                            <PaginationStrip onChange={changePage} totalPages={totalPages} />
                        </CardFooter>
                    ) : <></>
                }
                <ModalPodrobnosti />
            </Card>
        </>
    );
}

export default Nalogi;