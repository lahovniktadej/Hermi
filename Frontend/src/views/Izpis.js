import React, {useState} from 'react';

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

const data = [
    {
        objekt: "objekt1",
        datum: "2021-08-22",
        avto: "avto",
        sofer: "delavec1",
        delavci: ["delavec2", "delavec3"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "aktiven",
        netoCas: 8,
        odsotnostSoferja: 9,
        odsotnoDelavca: 8,
        netoMontaza: 23,
        brutoMontaza: 25

    },
    {
        objekt: "objekt3",
        id: 1,
        datum: "2021-05-22",
        avto: "avto",
        sofer: "delavec1",
        delavci:  ["delavec3"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "končan",
        netoCas: 7,
        odsotnostSoferja: 9,
        odsotnoDelavca: 8,
        netoMontaza: 21,
        brutoMontaza: 25

    },
    {
        objekt: "objekt2",
        id: 2,
        datum: "2020-05-22",
        avto: "avto",
        sofer: "delavec1",
        delavci:  ["delavec2", "delavec3"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "aktiven",
        netoCas: 7,
        odsotnostSoferja: 9,
        odsotnoDelavca: 8,
        netoMontaza: 21,
        brutoMontaza: 25
    },
    {
        objekt: "objekt1",
        id: 3,
        datum: "2021-05-22",
        avto: "avto",
        sofer: "delavec1",
        delavci:  ["delavec2"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "končan",
        netoCas: 8,
        odsotnostSoferja: 9,
        odsotnoDelavca: 8,
        netoMontaza: 23,
        brutoMontaza: 25

    },
    {  
        objekt: "objekt2",
        id: 4,
        datum: "2021-05-22",
        avto: "avto",
        sofer: "delavec1",
        delavci: ["delavec2"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "aktiven",
        netoCas: 7,
        odsotnostSoferja: 10,
        odsotnoDelavca: 8,
        netoMontaza: 21,
        brutoMontaza: 25

    },
];

function Izpis() {

    const [vsiPodatki] = useState(data);
    const [filtrirani, setFiltriran] = useState(data);

    const [modal, setModal] = useState();
    const [modalBody, setModalBody] = useState();
    
    const [delavci] = useState(["delavec1", "delavec2", "delavec3"]);
    const [objekti] = useState(["objekt1", "objekt2", "objekt3"]);

    const [obdobjeOD, setObdobjeOD] = useState();
    const [obdobjeDO, setObdobjeDO] = useState();
    const [iskanObjekt, setObjekt] = useState(objekti[0]);
    const [delavec, setDelavec] = useState(delavci[0]);
    const [aktiven, setAktiven] = useState(false); 
    const [koncan, setKoncan] = useState(false);

    const [obdobjeChecked, setObdobjeChecked] = useState(false);
    const [objektChecked, setObjektChecked] = useState(false);
    const [delavecChecked, setDelavecChecked] = useState(false);
    const [statusChecked, setStatusChecked] = useState(false);

    const handleBody = (el) => {
        toggle();
        setModalBody(izpisiCase(el));
    }

    const toggle = () => setModal(!modal);

    const handleSubmit=(e)=>{
        e.preventDefault();
        let iskaniPodatki = vsiPodatki;

        if(obdobjeChecked)
            iskaniPodatki = iskaniPodatki.filter((podatek) => ( new Date(obdobjeOD) <= new Date(podatek.datum) && new Date(obdobjeDO) >= new Date(podatek.datum)) === true); 
        
        console.log(iskaniPodatki);         
        if(delavecChecked){
            iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.sofer === delavec);
            let falseDelavci = vsiPodatki.filter((podatek) => (podatek.delavci.filter((iskanDelavec)=>{ return (iskanDelavec===delavec);})) === false);
            let iskaniDelavci = vsiPodatki.filter((podatki) => !falseDelavci.includes(podatki));
            iskaniPodatki = iskaniPodatki.concat(iskaniDelavci);
        }
        if(objektChecked)
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.objekt === iskanObjekt));

        if(statusChecked){
            if(aktiven)
                iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.status === "aktiven");
            else if(koncan)
                iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.status === "končan");
        }
        
        setFiltriran(iskaniPodatki);
        setKoncan(false);
        setAktiven(false);
    }

    const pridobiStatus = (status) => {
        if(status === "aktiven")
            return "fas fa-ban text-red";
        else
            return "ni ni-check-bold text-green";
    }
    const pridobiCas = (vrsta) => {
        let cas = [];
        if(vrsta==="netoMontaza")
            cas = filtrirani.map((data) => data.netoMontaza);
        else if(vrsta==="brutoMontaza")
            cas = filtrirani.map((data) => data.brutoMontaza);
        let sestevek = cas.reduce((a, b) => a + b, 0);
        return sestevek;
    }
    const izpisiCase = (el) => {
        let izpis = vsiPodatki.map((podatek)=>{
            if(podatek === el){
                return(
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <th scope="col">NETO čas delavca</th>
                            <th scope="col">Odsotnost šoferja</th>
                            <th scope="col">Odsotnost delavca</th>
                            <th scope="col">NETO montaža</th>
                            <th scope="col">BRUTO montaža</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{podatek.netoCas}</td>
                                <td>{podatek.odsotnoDelavca}</td>
                                <td>{podatek.odsotnostSoferja}</td>
                                <td>{podatek.netoMontaza}</td>
                                <td>{podatek.brutoMontaza}</td>
                            </tr>
                        </tbody>
                    </Table>
                    )
                }
            })
        return izpis;
    }

    const tableRow = (el) => {
        return (
            <tr>
                <th scope="row">
                    <Media className="align-items-center">
                        <span className="mb-0 text-sm">{el.objekt}</span>
                    </Media>
                </th>
                <td><span className={pridobiStatus(el.status)}></span></td>      
                <td>{new Date(el.datum).toLocaleString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                <td>{el.avto}</td>
                <td>{el.sofer}</td>
                <td>{el.delavci.map((delavec) => { return (<div>{delavec}</div>) })}</td>
                <td>{el.start}</td>
                <td>{el.pricetekDela}</td>
                <td>{el.konecDela}</td>
                <td>{el.prihod}</td>
                <td>
                    <Button size="sm" color="secondary" onClick={function(){ handleBody(el);}}>Poglej</Button>
                    <Modal isOpen={modal} toggle={toggle} size="lg">
                        <ModalHeader toggle={toggle}><h2>Izpis vseh časov</h2></ModalHeader>
                        <ModalBody>
                            {modalBody}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={toggle}>Zapri</Button>
                        </ModalFooter>
                    </Modal>
                </td>
            </tr>
     
        );
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row>
                            <Col>
                                <h3 className="mb-0">Zgodovina ekip</h3>
                            </Col>
                            <UncontrolledDropdown>
                                <DropdownToggle nav caret>
                                    Filter
                                </DropdownToggle>
                                <DropdownMenu right>
                                <Form role="form" onSubmit={handleSubmit}> 
                                    <div class="alert alert-white">
                                        <FormGroup check>
                                            <label className="h4">
                                                <Input type="checkbox" name="filter" defaultChecked={obdobjeChecked} onChange={e => setObdobjeChecked(e.target.checked)}/>
                                                Obdobje:
                                            </label>
                                        </FormGroup>
                                        <FormGroup>
                                            <label htmlFor="input-od">OD:</label>
                                            <Input id="input-od" className="form-control-alternative" type="date" onChange={e => setObdobjeOD(e.target.valueAsDate)}/> 
                                        </FormGroup>               
                                        <FormGroup>
                                            <label htmlFor="input-do">DO:</label>
                                            <Input id="input-do" className="form-control-alternative" type="date" onChange={e => setObdobjeDO(e.target.valueAsDate)}/> 
                                        </FormGroup>
                                    </div>
                                    <DropdownItem divider />
                                    <div class="alert alert-white">
                                        <FormGroup check>
                                            <label className="h4">
                                                <Input type="checkbox" name="filter" defaultChecked={objektChecked} onChange={e => setObjektChecked(e.target.checked)}/>
                                                    Objekt:
                                            </label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input id="input-date" className="form-control-alternative" type="select" onChange={e => setObjekt(e.target.value)}>
                                                {objekti.map((objekt) => {return(<option>{objekt}</option>);})}
                                            </Input>
                                        </FormGroup>
                                    </div>
                                    <DropdownItem divider />
                                    <div class="alert alert-white">
                                        <FormGroup check>
                                            <label className="h4">
                                                <Input type="checkbox" name="filter" defaultChecked={delavecChecked} onChange={e => setDelavecChecked(e.target.checked)}/>
                                                    Delavec:
                                            </label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input className="h4" id="input-date" type="select" onChange={e => setDelavec(e.target.value)}>
                                                {delavci.map((delavec) => {return(<option>{delavec}</option>);})}
                                            </Input>
                                        </FormGroup>
                                    </div>
                                    <DropdownItem divider />
                                    <div class="alert alert-white">
                                        <FormGroup check>
                                            <label className="h4">
                                                <Input type="checkbox" name="filter" defaultChecked={statusChecked} onClick={e => setStatusChecked(e.target.checked)}/>
                                                    Status:
                                            </label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <label>
                                                <Input type="radio" name="status" checked={aktiven}  onChange={e => setAktiven(e.target.checked)}/>
                                                    Aktiven
                                            </label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <label>
                                                <Input type="radio" name="status" checked={koncan} onChange={e => setKoncan(e.target.checked)}/>
                                                    Končan
                                            </label>
                                        </FormGroup>
                                    </div>
                                    <DropdownItem divider />
                                    <br/><div className="text-center"><Button color="danger" type="submit">Filtriraj</Button></div><br/>
                                </Form>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Row>
                    </CardHeader>        
                    <CardBody>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                        <tr>
                                <th scope="col">Objekt</th>
                                <th scope="col">Status</th>
                                <th scope="col">Datum</th>
                                <th scope="col">Avto</th>
                                <th scope="col">Šofer</th>
                                <th scope="col">Delavci</th>
                                <th scope="col">START</th>
                                <th scope="col">Pričetek<br/> dela</th>
                                <th scope="col">Konec<br/> dela</th>
                                <th scope="col">PRIHOD</th>
                                <th scope="col">ČASI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrirani.map((el) => tableRow(el))}
                        </tbody>
                    </Table><br/>
                    <Form role="form">
                        <div className="text-right"><Button color="danger" type="button">Shrani</Button></div>
                    </Form>
                    </CardBody>
                </Card><br/>
                <Card className="shadow">
                    <CardHeader>
                        <h3>Skupni časi</h3>
                    </CardHeader>
                    <CardBody>
                        Neto čas montaže: <b> {pridobiCas("netoMontaza")}</b><br/>
                        Bruto čas montaže: <b>{pridobiCas("brutoMontaza")}</b><br/>
                    </CardBody>
                </Card><br/>
            </Container>
        </>
    );
}

export default Izpis;