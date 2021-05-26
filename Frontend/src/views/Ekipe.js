import React, { useState, useEffect } from 'react';

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
} from "reactstrap";

import Header from 'components/Headers/Header';

const data = [
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: ["priimek1", "priimek2"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "aktiven"

    },
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: ["priimek1", "priimek2"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "aktiven"

    },
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: ["priimek1", "priimek2"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "aktiven"
    },
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: ["priimek1", "priimek2"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "aktiven"

    },
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: ["priimek1", "priimek2"],
        start: "6:25",
        pricetekDela: "8:10",
        konecDela: "13:55",
        prihod: "16:20",
        status: "aktiven"

    },
];

function Ekipe() {

    const [objekti] = useState(["objekt1", "objek2", "objekt3"]);
    const [avti] = useState(["avto1", "avto2", "avto3"]);
    const [delavci, setDelavci] = useState(["delavec1"]);

    const [izbraniDelavci] = useState(["delavec1", "delavec2", "delavec3"]);
    const [izpisDelavcev, setizpisDelavcev] = useState();

    const [setObjekt] = useState(objekti[0]);
    const [setDatum] = useState();
    const [setAvto] = useState(avti[0]);
    const [setSofer] = useState(delavci[0]);
    const [start, setStart] = useState();
    const [pricetek, setPricetek] = useState();
    const [konec, setKonec] = useState();
    const [prihod, setPrihod] = useState();

    const [netoDelavec, setNetoDelavec] = useState();
    const [odsotnostDelavca, setOdsotnostDelavca] = useState();
    const [odsotnostSoferja, setOdsotnostSoferja] = useState();
    const [netoMontaza, setNetoMontaza] = useState();
    const [brutoMontaza, setBrutoMontaza] = useState();

    const handleIzpis = () =>{
        return(
            <Row>
                <Col className="mb-4">
                    <Input id="input-delavci" className="form-control-alternative" type="select">
                        {izbraniDelavci.map((delavec) => <option>{delavec}</option>)}
                    </Input>
                </Col>
                <Col className="mb-4">
                    <Button color="danger" onClick={handleRemoveClick}>-</Button>
                </Col>
            </Row>
        );           
    }
    const handleAddClick = () =>{
        let list = delavci;
        list.push(izbraniDelavci[0]);
        setDelavci(list);
        setizpisDelavcev(delavci.map(() => {
            return handleIzpis();
        }));
    };

    const handleRemoveClick = () => {
        let list = delavci;
        list.pop();
        setDelavci(list);
        setizpisDelavcev(delavci.map(() => {
            return handleIzpis();
        }));
    };

    const handleConvert = (cas)=>{
        let splitCas = cas.split(':');
        let ure = splitCas[0];
        let minute = splitCas[1];
        let skupneMinute = (parseInt(ure)*60) + parseInt(minute);
        return skupneMinute;
    }
    const handleChangeStatus = (el)=>{
        /* koda ;) */
    }

    const handleTimes = () => {
        let konecMinute = handleConvert(konec);
        let pricetekMinute = handleConvert(pricetek)
        let prihodMinute = handleConvert(prihod);
        let startMinute = handleConvert(start);
        let netoD = (konecMinute - pricetekMinute)/60;
        let odsotnostS = (prihodMinute - startMinute)/60; 
        let netoM = (delavci.length*netoD) + odsotnostS;
        let odsotnoD
        if(netoD <= 8)
            odsotnoD=8;
        else
            odsotnoD=netoD;

        let brutoM = (delavci.length*odsotnoD) + odsotnostS;
        
        setNetoDelavec(netoD);
        setOdsotnostSoferja(odsotnostS);
        setOdsotnostDelavca(odsotnoD);
        setNetoMontaza(netoM);
        setBrutoMontaza(brutoM);
    }

    useEffect(() => {
        setizpisDelavcev(delavci.map(()=>{
            return handleIzpis();
        }));
      }, [delavci])

    const tableRow = (el) => {
        return (
            <tr>
                <th scope="row">
                    <Media className="align-items-center">
                        <span className="mb-0 text-sm">
                             {el.objekt}
                        </span>
                    </Media>
                </th>
                <td><i className="fas fa-ban text-red"></i></td>      
                <td>{el.datum}</td>
                <td>{el.avto}</td>
                <td>{el.sofer}</td>
                <td>{el.delavci.map((delavec) => { return (<div>{delavec}</div>) })}</td>
                <td>{el.start}</td>
                <td>{el.pricetekDela}</td>
                <td>{el.konecDela}</td>
                <td>{el.prihod}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color="" onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem  onClick={handleChangeStatus(el)}> Spremeni status</DropdownItem>
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
                                <h3 className="mb-0">Aktivne ekipe</h3>
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
                                        <th scope="col">Pričetek <br/>dela</th>
                                        <th scope="col">Konec <br/> dela</th>
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
                <Row>               
                    <Col>
                        <Card className="shadow bg-secondary">
                            <CardHeader>
                                <h3 className="mb-0">Dodaj ekipo</h3>
                            </CardHeader>
                            <CardBody>
                                <Form role="form">
                                <Row>
                                    <Col className="mb-4">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-objekt">
                                            Objekt
                                        </label>
                                        <Input id="input-date" className="form-control-alternative" type="select" onChange={e => setObjekt(e.target.value)}>
                                           {objekti.map((objekt) => {return(<option>{objekt}</option>);})}
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-4">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-avto">
                                            Avto
                                        </label>
                                        <Input id="input-avto" className="form-control-alternative" type="select" onChange={e => setAvto(e.target.value)}>
                                            {avti.map((avto) => {return(<option>{avto}</option>);})}
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-4">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-sofer">
                                            Šofer
                                        </label>
                                        <Input id="input-sofer" className="form-control-alternative" type="select" onChange={e => setSofer(e.target.value)}>
                                            {izbraniDelavci.map((delavec) => {return(<option>{delavec}</option>);})}
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    </Row>
                                    <FormGroup>
                                        <label className="form-control-label" htmlFor="input-delavci">
                                            Delavci
                                        </label>
                                        {izpisDelavcev}
                                       <Button color="danger" onClick={handleAddClick}>+</Button>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-date">
                                            Datum
                                        </label>
                                        <Input id="input-date" className="form-control-alternative" type="date" onChange={e => setDatum(e.target.checked)}/> 
                                    </FormGroup>
                                    <Row>
                                    <Col className="mb-3">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-start">
                                            START
                                        </label>
                                        <Input id="input-start" className="form-control-alternative" type="time" onChange={e => setStart(e.target.value)}/>
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-3">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-zacetek">
                                            Pričetek dela
                                        </label>
                                        <Input id="input-zacetek" className="form-control-alternative" type="time" onChange={e => setPricetek(e.target.value)}/>
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-3">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-konec">
                                            Konec dela
                                        </label>
                                        <Input id="input-konec" className="form-control-alternative" type="time" onChange={e => setKonec(e.target.value)}/>
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-3">
                                    <FormGroup className="mb-3">
                                        <label className="form-control-label" htmlFor="input-prihod">
                                            PRIHOD
                                        </label>
                                        <Input id="input-prihod" className="form-control-alternative" type="time" onChange={e => setPrihod(e.target.value)}/>
                                    </FormGroup>
                                    </Col>
                                    </Row>                                   
                                    <Button color="danger" onClick={handleTimes}>Izračunaj čase</Button><br/><br/>

                                    <Row>
                                    <Col className="mb-2">
                                        <label className="form-control-label" htmlFor="input-neto-delavec">
                                            Neto delavca:
                                        </label>
                                        <Input id="input-neto-delavec" className="form-control-alternative" type="text" value={netoDelavec} onChange={e => setNetoDelavec(e.target.value)}/>
                                    </Col>
                                    <Col className="mb-2">
                                        <label className="form-control-label" htmlFor="input-cas-sofer">
                                            Odsotnost šoferja:
                                        </label>
                                        <Input id="input-cas-sofer" className="form-control-alternative" type="text" value={odsotnostSoferja} onChange={e => setOdsotnostSoferja(e.target.value)}/>
                                    </Col>
                                    <Col className="mb-2">
                                        <label className="form-control-label" htmlFor="input-cas-delavec">
                                            Odsotnost delavca:
                                        </label>
                                        <Input id="input-cas-delavec" className="form-control-alternative" type="text" value={odsotnostDelavca} onChange={e => setOdsotnostDelavca(e.target.value)}/>
                                    </Col>
                                    <Col className="mb-2">
                                        <label className="form-control-label" htmlFor="input-neto-montaza">
                                            Neto čas montaže:                                           
                                        </label>
                                        <Input id="input-neto-montaza" className="form-control-alternative" type="text" value={netoMontaza} onChange={e => setNetoMontaza(e.target.value)}/>
                                    </Col>
                                    <Col className="mb-2">
                                        <label className="form-control-label" htmlFor="input-bruto-montaza">
                                            Bruto čas montaže:
                                        </label>
                                        <Input id="input-bruto-montaza" className="form-control-alternative" type="text" value={brutoMontaza} onChange={e => setBrutoMontaza(e.target.value)}/>
                                    </Col>
                                    </Row><br/>
                                    <div className="text-center">
                                        <Button color="danger" type="button">Dodaj</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Ekipe;