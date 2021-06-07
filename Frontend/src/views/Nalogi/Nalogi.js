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
    const [nalogi, setNalogi] = React.useState([]);
    const [delavci, setDelavci] = React.useState([]);
    const [nalog, setNalog] = React.useState({
        sifra: "",
        naziv: "",
        objekt: "",
        zacetek: "",
        ekipe: []
    });
    const [ekipa, setEkipa] = React.useState({
        sofer: {},
        delavci: []
    });
    const [totalPages, setTotalPages] = React.useState(0);
    const perPage = 5;

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
    }, []);

    const dodajNalog = (el) => {
        el.preventDefault();
        changePage(0);

        let nalogiArr = Array.from(nalogi);

        nalog.ekipe.push(ekipa)
        nalog.zacetek = new Date(nalog.zacetek).toISOString();

        nalogiArr.push(nalog);

        axios.post(`/api/delovniNalog`, nalog).then();

        setNalogi(nalogiArr);
    }

    const nalogChange = (el) => {
        setNalog({
            ...nalog,
            [el.target.name]: el.target.value,
            ekipe: [...nalog.ekipe]
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
        console.log(selectedNalog, ekipa);
        axios.put(`/api/ekipa/${ekipa.id}`, ekipa)
            .then(() => {
                axios.get(`/api/delovniNalog/${selectedNalog.id}`)
                    .then((res) => {
                        let nalogiArr = Array.from(nalogi);
                        let index = nalogiArr.indexOf(selectedNalog);
                        nalogiArr[index] = res.data;
                        setNalogi(nalogiArr);
                    });
            });
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

    const spremeniSoferja = (index) => {
        setEkipa({
            ...ekipa,
            sofer: delavci[index]
        });
    }

    const [selectedNalog, setSelectedNalog] = React.useState(nalog);
    const [ekipaModalState, setEkipaModalState] = React.useState(false);
    const toggleEkipaModal = (nalog) => {
        setEkipaModalState(!ekipaModalState);
        if (!ekipaModalState) {
            setSelectedNalog(nalog || {
                sifra: "",
                naziv: "",
                objekt: "",
                zacetek: "",
                ekipa: []
            });
        }
    };

    const [nalogModalState, setNalogModalState] = React.useState(false);
    const toggleNalogModal = (nalog) => {
        setNalogModalState(!nalogModalState);
        if (!nalogModalState) {
            setSelectedNalog(nalog || {
                sifra: "",
                naziv: "",
                objekt: "",
                zacetek: "",
                ekipa: []
            });
        }
    };

    const [deleteModalState, setDeleteModalState] = React.useState(false);
    const toggleDeleteModal = (nalog) => {
        setDeleteModalState(!deleteModalState);
        if (!deleteModalState) {
            setSelectedNalog(nalog || {});
        }
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
                        <Button size="sm" color="success" onClick={() => toggleEkipaModal(props.row)} >Ekipe</Button>
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
                                <h3 className="mb-0">Delovni nalogi</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush text-center" responsive>
                                <thead className="thead-light">
                                    <th scope="col">Status</th>
                                    <th scope="col">Šifra</th>
                                    <th scope="col">Naziv</th>
                                    <th scope="col">Objekt</th>
                                    <th scope="col">Zacetek</th>
                                    <th scope="col">Ekipa</th>
                                    <th scope="col" />
                                </thead>
                                <tbody>
                                    {nalogi.map((nalog) => { return <Tr row={nalog} /> })}
                                </tbody>
                            </Table>
                            <CardFooter>
                                {(totalPages > 1) ? <PaginationStrip onChange={changePage} totalPages={totalPages} /> : <></>}
                            </CardFooter>
                            <EkipaModal toggle={toggleEkipaModal} state={ekipaModalState} nalog={selectedNalog} delavci={delavci} dodajEkipo={dodajEkipo} posodobiEkipo={posodobiEkipo} />
                            <NalogModal toggle={toggleNalogModal} state={nalogModalState} nalog={selectedNalog} />
                            <DeleteModal toggle={toggleDeleteModal} state={deleteModalState} text="Ali res želite odstraniti izbrani delovni nalog?" onSubmit={removeNalog} />
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
                                        <AddEkipa ekipa={ekipa} delavci={delavci} dodajDelavca={dodajDelavca} odstraniDelavca={odstraniDelavca} spremeniSoferja={spremeniSoferja} />
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
