import React, {useState} from 'react';

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
        objekt: "objekt1",
        datum: "2021-05-22",
        avto: "avto",
        sofer: "delavec1",
        delavci: ["delavec2", "delavec3"],
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
        objekt: "objekt3",
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
        datum: "2021-05-22",
        avto: "avto",
        sofer: "delavec1",
        delavci:  ["delavec2"],
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
        odsotnostSoferja: 9,
        odsotnoDelavca: 8,
        netoMontaza: 21,
        brutoMontaza: 25

    },
];

function Analiza() {

    const [vsiPodatki, setVsiPodatki] = useState(data);
    const [filtrirani, setFiltriran] = useState(data);

    
    const [delavci, setDelavci] = useState(["delavec1", "delavec2", "delavec3"]);
    const [objekti, setObjekti] = useState(["objekt1", "objekt2", "objekt3"]);

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

    const handleSubmit=(e)=>{
        e.preventDefault();

        let iskaniPodatki = vsiPodatki;

        if(obdobjeChecked)
            iskaniPodatki = iskaniPodatki.filter((podatek) => ( new Date(obdobjeOD) <= new Date(podatek.datum) && new Date(obdobjeDO) >= new Date(podatek.datum)) == true); 
        
        console.log(iskaniPodatki);         
        if(delavecChecked){
            iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.sofer == delavec);
            let falseDelavci = vsiPodatki.filter((podatek) => (podatek.delavci.filter((iskanDelavec)=>{ 
                return (iskanDelavec==delavec);
            })
            ) == false);
            let iskaniDelavci = vsiPodatki.filter((podatki) => !falseDelavci.includes(podatki));

            iskaniPodatki = iskaniPodatki.concat(iskaniDelavci);
        }
        if(objektChecked)
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.objekt == iskanObjekt));

        if(statusChecked){
            if(aktiven)
                iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.status == "aktiven");
            else if(koncan)
                iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.status == "končan");
        }
        
        setFiltriran(iskaniPodatki);
        setKoncan(false);
        setAktiven(false);
    }

    const pridobiStatus = (status) => {
        if(status == "aktiven")
            return "text-red";
        else
            return "text-green";
    }
    const pridobiCas = (vrsta) => {
        let cas = [];
        let delavec;
        if(vrsta=="netoMontaza")
            cas = filtrirani.map((data) => data.netoMontaza);
        else if(vrsta=="brutoMontaza")
            cas = filtrirani.map((data) => data.brutoMontaza);
        let sestevek = cas.reduce((a, b) => a + b, 0);
        return sestevek;
    }

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
                <td><span className={pridobiStatus(el.status)}>{el.status}</span></td>      
                <td>{el.datum}</td>
                <td>{el.avto}</td>
                <td>{el.sofer}</td>
                <td>{el.delavci.map((delavec) => { return (<div>{delavec}</div>) })}</td>
                <td>{el.start}</td>
                <td>{el.pricetekDela}</td>
                <td>{el.konecDela}</td>
                <td>{el.prihod}</td>
                <td>{el.netoCas}</td>
                <td>{el.odsotnoDelavca}</td>
                <td>{el.odsotnostSoferja}</td>
                <td>{el.netoMontaza}</td>
                <td>{el.brutoMontaza}</td>
            </tr>
        );
    };


    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="md-4">
                    <Form role="form" onSubmit={handleSubmit}>   
                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">                            
                            FILTER <span class="ni ni-bold-down"></span>
                        </a>
                        <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                            <FormGroup check>
                                        <label className="h3">
                                            <Input type="checkbox" name="filter" defaultChecked={obdobjeChecked} onChange={e => setObdobjeChecked(e.target.checked)}/>
                                              Obdobje:
                                        </label>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            htmlFor="input-od"
                                        >
                                        OD:</label>
                                        <Input
                                            id="input-od"
                                            className="form-control-alternative"
                                            type="date"
                                            onChange={e => setObdobjeOD(e.target.valueAsDate)}
                                        /> 
                            </FormGroup>               
                            <FormGroup>
                                <label
                                    htmlFor="input-do"
                                >
                                DO:</label>
                                <Input
                                    id="input-do"
                                    className="form-control-alternative"
                                    type="date"
                                    onChange={e => setObdobjeDO(e.target.valueAsDate)}
                                /> 
                            </FormGroup>
                            <FormGroup check>
                                <label className="h3">
                                    <Input type="checkbox" name="filter" defaultChecked={objektChecked} onChange={e => setObjektChecked(e.target.checked)}/>
                                        Objekt:
                                </label>
                            </FormGroup>
                            <FormGroup>
                                <Input  
                                    id="input-date"
                                    className="form-control-alternative"
                                    type="select" 
                                    onChange={e => setObjekt(e.target.value)}

                                >
                                    {objekti.map((objekt) => {
                                            return(
                                                <option>{objekt}</option>
                                            );
                                        }
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup check>
                                <label className="h3">
                                    <Input type="checkbox" name="filter" defaultChecked={delavecChecked} onChange={e => setDelavecChecked(e.target.checked)}/>
                                        Delavec:
                                </label>
                            </FormGroup>
                            <FormGroup>
                                <Input  
                                    className="h2"
                                    id="input-date"
                                    className="form-control-alternative"
                                    type="select"
                                    onChange={e => setDelavec(e.target.value)}
                                >
                                    {delavci.map((delavec) => {
                                            return(
                                                <option>{delavec}</option>
                                            );
                                        }
                                    )}
                                </Input>
                            </FormGroup>
                            <FormGroup check>
                                <label className="h3">
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
                            <Button color="primary" type="submit">Filtriraj</Button>
                            </div>
                        </div>
                    </Form>
                    </Col>
                    <Col className="md-6"></Col>
                    </Row><br/>
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Zgodovina ekip</h3>
                            </CardHeader>
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
                                        <th scope="col">Pričetek dela</th>
                                        <th scope="col">Konec dela</th>
                                        <th scope="col">PRIHOD</th>
                                        <th scope="col">NETO čas dela</th>
                                        <th scope="col">Odsotnost šoferja</th>
                                        <th scope="col">Odsotnost delavca</th>
                                        <th scope="col">NETO montaža</th>
                                        <th scope="col">BRUTO montaža</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtrirani.map((el) => tableRow(el))}
                                </tbody>
                            </Table>
                        </Card><br/>
                        <Card className="shadow">
                            <CardHeader>
                                <h3>Skupni časi</h3>
                            </CardHeader>
                            <CardBody>
                            Neto čas montaže: <b> {pridobiCas("netoMontaza")}</b><br/>
                            Bruto čas montaže: <b>{pridobiCas("brutoMontaza")}</b>
                            </CardBody>
                        </Card><br/>
                        <Form role="form">
                           <Button color="primary" type="button">Shrani</Button>
                        </Form>

                       
            </Container>
        </>
    );
}

export default Analiza;