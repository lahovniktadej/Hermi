import React from 'react';
import Header from 'components/Headers/Header';
import axios from 'axios';
import PaginationStrip from './PaginationStrip';
import EkipaModal from './EkipaModal';
import NalogModal from './NalogModal';
import AddEkipa from './AddEkipa';
import ManagedInput from '../common/ManagedInput';
import DeleteModal from '../common/DeleteModal';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    Table,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Button,
    CardBody,
    Form,
    CardFooter,
    UncontrolledTooltip
} from 'reactstrap';

function Nalogi() {
    const emptyNalog = {
        sifra: "",
        naziv: "",
        objekt: "",
        ekipe: [],
        zacetek: null,
        konec: null
    }

    const [nalogi, setNalogi] = React.useState([]);
    const [delavci, setDelavci] = React.useState([]);
    const [vozila, setVozila] = React.useState([]);
    const [nalog, setNalog] = React.useState(emptyNalog);
    const [ekipa, setEkipa] = React.useState({
        sofer: {},
        delavci: [],
        vozilo: {}
    });
    
    const [selectedNalog, setSelectedNalog] = React.useState(nalog);
    const [totalPages, setTotalPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(5);

    React.useEffect(() => {
        axios.get(`/api/delovniNalog`, { params: { page: 0, perPage: perPage } })
            .then((res) => {
                const delovniNalogi = res.data.content;
                setTotalPages(res.data.totalPages);
                setNalogi(delovniNalogi);
            });
        axios.get(`/api/delavec`)
            .then((res) => {
                const delavci = res.data;
                setDelavci(delavci);
            });
        axios.get(`/api/vozilo`)
            .then((res) => {
                const vozila = res.data;
                setVozila(vozila);
            });
    }, [perPage]);

    const dodajNalog = (el) => {
        el.preventDefault();
        changePage(0);

        let nalogiArr = Array.from(nalogi);

        nalog.ekipe.push(ekipa)
        nalog.zacetek = new Date(nalog.zacetek).toISOString();

        axios.post(`/api/delovniNalog`, nalog)
            .then((res) => {
                nalogiArr.push(res.data);
                setNalogi(nalogiArr);
            });
    }

    const nalogChange = (el) => {
        setNalog({
            ...nalog,
            [el.target.name]: el.target.value,
            ekipe: [...nalog.ekipe]
        });
    }

    const nalogModalChange = (nalog) => {
        setSelectedNalog({
            ...selectedNalog,
            ...nalog
        });
    }

    const removeNalog = () => {
        let nalogiArr = Array.from(nalogi);
        nalogiArr.splice(nalogiArr.indexOf(setSelectedNalog), 1);
        setNalogi(nalogiArr);

        axios.delete(`/api/delovniNalog/${setSelectedNalog.id}`).then();
    }

    const dodajEkipo = (ekipa) => {
        let nalogiArr = Array.from(nalogi);
        let nalog = nalogiArr[nalogiArr.indexOf(selectedNalog)];

        delete ekipa.id;
        ekipa.datum = new Date().toISOString();

        nalog.ekipe.push(ekipa);
        setNalogi(nalogiArr);

        axios.put(`/api/delovniNalog/${nalog.id}`, nalog).then();
    }

    const posodobiEkipo = (ekipa) => {
        axios.put(`/api/ekipa/${ekipa.id}`, ekipa)
            .then((res) => {
                let nalogiArr = Array.from(nalogi);
                let nalogaIndex = nalogiArr.indexOf(selectedNalog);
                let ekipaIndex = nalogiArr[nalogaIndex].ekipe.findIndex((val) => { return val.id == ekipa.id });
                nalogiArr[nalogaIndex].ekipe[ekipaIndex] = res.data;
                setNalogi(nalogiArr);
            });
    }

    const posodobiDelovniNalog = (nalog) => {
        axios.put(`/api/delovniNalog/${nalog.id}`, nalog)
            .then((res) => {
                let nalogiArr = Array.from(nalogi);
                let nalogaIndex = nalogiArr.findIndex((val) => { return val.id == nalog.id });
                nalogiArr[nalogaIndex] = res.data;
                setNalogi(nalogiArr);
            });
    }

    const zakljuciNalog = (nalog) => {
        let nalogCopy = { ...nalog };
        nalogCopy.status = true;
        posodobiDelovniNalog(nalogCopy);
    }

    const dodajDelavca = (delavec) => {
        let delavci = Array.from(ekipa.delavci);
        delavci.push(delavec);
        setEkipa({
            ...ekipa,
            delavci: delavci
        });
    }

    const odstraniDelavca = (delavec) => {
        let delavci = Array.from(ekipa.delavci);
        delavci.splice(delavci.indexOf(delavec), 1);
        setEkipa({
            ...ekipa,
            delavci: delavci
        });
    }

    const spremeniSoferja = (sofer) => {
        setEkipa({
            ...ekipa,
            sofer: sofer
        });
    }

    const spremeniVozilo = (vozilo) => {
        setEkipa({
            ...ekipa,
            vozilo: vozilo
        });
    }

    const [modalState, setModalState] = React.useState({
        nalog: false,
        ekipa: false,
        delete: false
    })

    const toggleEkipaModal = (nalog) => {
        if (!modalState.ekipa) {
            setSelectedNalog(nalog || emptyNalog);
        }
        setModalState({
            ...modalState,
            ekipa: !modalState.ekipa
        });
    };

    const toggleNalogModal = (nalog) => {
        if (!modalState.nalog) {
            setSelectedNalog(nalog || emptyNalog);
        }
        setModalState({
            ...modalState,
            nalog: !modalState.nalog
        });
    };

    const toggleDeleteModal = (nalog) => {
        if (!modalState.delete) {
            setSelectedNalog(nalog || emptyNalog);
        }
        setModalState({
            ...modalState,
            delete: !modalState.delete
        })
    };

    const Tr = (props) => {
        return (
            <>
                <UncontrolledTooltip delay={0} placement="top" target="status-nekoncano">Aktiven</UncontrolledTooltip>
                <tr>
                    <td>
                        {
                            (!props.row.status) ? <i id="status-nekoncano" class="fas fa-circle fa-xs text-red"></i> : <i id="status-koncano" class="fas fa-circle fa-xs text-green"></i>
                        }
                    </td>
                    <td>{props.row.sifra}</td>
                    <td>{props.row.naziv}</td>
                    <td>{props.row.objekt}</td>
                    <td>{new Date(props.row.zacetek).toLocaleDateString()}</td>
                    <td>
                        <Button size="sm" color="success" onClick={() => toggleEkipaModal(props.row)} >Dnevno delo</Button>
                    </td>
                    <td className="text-right">
                        <UncontrolledDropdown>
                            <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color onClick={(e) => e.preventDefault()}>
                                <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem onClick={() => toggleNalogModal(props.row)}> Uredi </DropdownItem>
                                <DropdownItem className="text-red" onClick={() => { toggleDeleteModal(props.row) }}> Odstrani </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
            </>
        );
    }

    const changePage = (page) => {
        axios.get(`/api/delovniNalog`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const delovniNalogi = res.data.content;
                setTotalPages(res.data.totalPages);
                setNalogi(delovniNalogi);
            });
    }

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <Col>
                                        <h3 className="mb-0">Delovni nalogi</h3>
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
                            <Table className="align-items-center table-flush text-center" responsive>
                                <thead className="thead-light">
                                    <th scope="col">Status</th>
                                    <th scope="col">Šifra</th>
                                    <th scope="col">Naziv</th>
                                    <th scope="col">Objekt</th>
                                    <th scope="col">Zacetek</th>
                                    <th scope="col">Delo</th>
                                    <th scope="col" />
                                </thead>
                                <tbody>
                                    {nalogi.map((nalog) => { return <Tr row={nalog} /> })}
                                </tbody>
                            </Table>
                            <CardFooter>
                                {(totalPages > 1) ? <PaginationStrip onChange={changePage} totalPages={totalPages} /> : <></>}
                            </CardFooter>
                            <EkipaModal toggle={toggleEkipaModal} state={modalState.ekipa} nalog={selectedNalog} delavci={delavci} dodajEkipo={dodajEkipo} posodobiEkipo={posodobiEkipo} vozila={vozila} />
                            <NalogModal toggle={toggleNalogModal} state={modalState.nalog} nalog={selectedNalog} onSubmit={posodobiDelovniNalog} onChange={nalogModalChange} zakljuciNalog={zakljuciNalog} />
                            <DeleteModal toggle={toggleDeleteModal} state={modalState.delete} text="Ali res želite odstraniti izbrani delovni nalog?" onSubmit={removeNalog} />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow bg-secondary">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Dodaj delovni nalog</h3>
                            </CardHeader>
                            <Form onSubmit={dodajNalog} >
                                <CardBody>
                                    <h6 className="heading-small text-muted mb-4">Delovni nalog</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="3">
                                                <ManagedInput label="Šifra" required name="sifra" value={nalog.sifra} onChange={nalogChange} />
                                            </Col>
                                            <Col lg="3">
                                                <ManagedInput label="Naziv" required name="naziv" value={nalog.naziv} onChange={nalogChange} />
                                            </Col>
                                            <Col lg="3">
                                                <ManagedInput label="Objekt" required name="objekt" value={nalog.objekt} onChange={nalogChange} />
                                            </Col>
                                            <Col lg="3">
                                                <ManagedInput label="Začetek" required name="zacetek" value={nalog.zacetek} onChange={nalogChange} type="date" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">Ekipa</h6>
                                    <div className="pl-lg-4">
                                        <AddEkipa ekipa={ekipa} delavci={delavci} dodajDelavca={dodajDelavca} odstraniDelavca={odstraniDelavca} spremeniSoferja={spremeniSoferja} vozila={vozila} spremeniVozilo={spremeniVozilo} />
                                    </div>
                                </CardBody>
                                <CardFooter className="border-0">
                                    <Row>
                                        <Col className="text-center">
                                            <Button color="danger">Dodaj</Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Nalogi;
