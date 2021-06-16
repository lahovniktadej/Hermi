import React from 'react';
import Header from 'components/Headers/Header';
import axios from 'axios';
import PaginationStrip from 'views/common/PaginationStrip';
import EkipaModal from './EkipaModal';
import NalogModal from './NalogModal';
import DeleteModal from 'views/common/DeleteModal';
import { Link } from "react-router-dom";

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

    const [selectedNalog, setSelectedNalog] = React.useState(emptyNalog);
    const [totalPages, setTotalPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(10);

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

    const nalogModalChange = (nalog) => {
        setSelectedNalog({
            ...selectedNalog,
            ...nalog
        });
    }

    const removeNalog = () => {
        let nalogiArr = Array.from(nalogi);
        nalogiArr.splice(nalogiArr.indexOf(selectedNalog), 1);
        setNalogi(nalogiArr);

        axios.delete(`/api/delovniNalog/${selectedNalog.id}`).then();
    }

    const dodajEkipo = (ekipa) => {
        let nalogiArr = Array.from(nalogi);
        let nalog = nalogiArr[nalogiArr.indexOf(selectedNalog)];

        delete ekipa.id;
        ekipa.datum = new Date().toISOString();

        ekipa.spremenil = sessionStorage.getItem("user_uid");
        nalog.ekipe.push(ekipa);
        nalog.spremenil = sessionStorage.getItem("user_uid");
        setNalogi(nalogiArr);

        axios.put(`/api/delovniNalog/${nalog.id}`, nalog).then();
    }

    const posodobiEkipo = (ekipa) => {
        ekipa.spremenil = sessionStorage.getItem("user_uid");
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
        nalog.spremenil = sessionStorage.getItem("user_uid");
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
                    <td>
                        <Link class="btn btn-secondary btn-sm" to={{ pathname: "/admin/izpis",  sifra: props.row.sifra }}>Vsa dnevna dela </Link>
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
                                                <DropdownItem onClick={() => setPerPage(10)}>10</DropdownItem>
                                                <DropdownItem onClick={() => setPerPage(15)}>15</DropdownItem>
                                                <DropdownItem onClick={() => setPerPage(20)}>20</DropdownItem>
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
                                    <th scope="col">Dodaj dnevno delo</th>
                                    <th scope="col">Pogled dnevnih del</th>
                                    <th scope="col" />
                                </thead>
                                <tbody>
                                    {nalogi.map((nalog) => { return <Tr row={nalog} /> })}
                                </tbody>
                            </Table>
                            {
                                (totalPages > 1) ? (
                                    <CardFooter>
                                        <PaginationStrip onChange={changePage} totalPages={totalPages} />
                                    </CardFooter>
                                ) : <></>
                            }
                            <EkipaModal toggle={toggleEkipaModal} state={modalState.ekipa} nalog={selectedNalog} delavci={delavci} dodajEkipo={dodajEkipo} posodobiEkipo={posodobiEkipo} vozila={vozila} />
                            <NalogModal toggle={toggleNalogModal} state={modalState.nalog} nalog={selectedNalog} onSubmit={posodobiDelovniNalog} onChange={nalogModalChange} zakljuciNalog={zakljuciNalog} />
                            <DeleteModal toggle={toggleDeleteModal} state={modalState.delete} text="Ali res želite odstraniti izbrani delovni nalog?" onSubmit={removeNalog} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Nalogi;
