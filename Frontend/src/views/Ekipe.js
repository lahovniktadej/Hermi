import React, { useState, useEffect } from 'react';

import {
    Container,
    Row,
    Col,
    FormGroup,
    Form,
    Input,
    Button,
} from "reactstrap";

function Ekipe() {

    const [avti, SetAvti] = useState(["avto1", "avto2", "avto3"]);
    const [delavci, setDelavci] = useState(["delavec1"]);

    const [izbraniDelavci,setIzbrisaniDelavci] = useState(["delavec1", "delavec2", "delavec3"]);
    const [izpisDelavcev, setizpisDelavcev] = useState();

    const [datum, setDatum] = useState();
    const [avto, setAvto] = useState(avti[0]);
    const [sofer, setSofer] = useState(delavci[0]);
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

    const handleTimes = () => {
        let konecMinute = handleConvert(konec);
        let pricetekMinute = handleConvert(pricetek)
        let prihodMinute = handleConvert(prihod);
        let startMinute = handleConvert(start);
        let netoD = (konecMinute - pricetekMinute)/60;
        netoD = netoD.toFixed(2);
        let odsotnostS = (prihodMinute - startMinute)/60;
        odsotnostS = odsotnostS.toFixed(2);
        let netoM = (delavci.length*netoD) + parseFloat(odsotnostS); 
        netoM = parseFloat(netoM).toFixed(2);
        let odsotnoD;
        if(netoD <= 8)
            odsotnoD=8;
        else
            odsotnoD=netoD;

        console.log(parseFloat(odsotnostS));
        odsotnoD = odsotnoD.toFixed(2);
        let brutoM = (delavci.length*odsotnoD) + parseFloat(odsotnostS); 
        brutoM = parseFloat(brutoM).toFixed(2);
        
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

    return (
        <>
                <Form role="form">
                 <Row>
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
                    <Row>
                    <Col className="mb-3">
                    <FormGroup className="mb-3">
                        <label className="form-control-label" htmlFor="input-date">
                            Datum
                        </label>
                        <Input id="input-date" className="form-control-alternative" type="date" onChange={e => setDatum(e.target.checked)}/> 
                    </FormGroup>
                    </Col>
                    </Row>
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
                    <Row>    
                        <Col className="mb-3 text-center">                          
                            <Button color="secondary" onClick={handleTimes}>Izračunaj čase</Button><br/><br/>
                        </Col>
                    </Row>     
                    <Row>
                    <Col className="mb-2">
                        <label className="form-control-label" htmlFor="input-neto-delavec">
                            Neto <br/>delavca:
                        </label>
                        <Input id="input-neto-delavec" className="form-control-alternative" type="number" step="0.01" value={netoDelavec} onChange={e => setNetoDelavec(e.target.value)}/>
                    </Col>
                    <Col className="mb-2">
                        <label className="form-control-label" htmlFor="input-cas-sofer">
                            Odsotnost <br/>šoferja:
                        </label>
                        <Input id="input-cas-sofer" className="form-control-alternative" type="number" step="0.01" value={odsotnostSoferja} onChange={e => setOdsotnostSoferja(e.target.value)}/>
                    </Col>
                    <Col className="mb-2">
                        <label className="form-control-label" htmlFor="input-cas-delavec">
                            Odsotnost <br/>delavca:
                        </label>
                        <Input id="input-cas-delavec" className="form-control-alternative" type="number" step="0.01" value={odsotnostDelavca} onChange={e => setOdsotnostDelavca(e.target.value)}/>
                    </Col>
                    <Col className="mb-2">
                        <label className="form-control-label" htmlFor="input-neto-montaza">
                            Neto čas<br/> montaže:                                           
                        </label>
                        <Input id="input-neto-montaza" className="form-control-alternative" type="number" step="0.01" value={netoMontaza} onChange={e => setNetoMontaza(e.target.value)}/>
                    </Col>
                    <Col className="mb-2">
                        <label className="form-control-label" htmlFor="input-bruto-montaza">
                            Bruto čas<br/> montaže:
                        </label>
                        <Input id="input-bruto-montaza" className="form-control-alternative" type="number" step="0.01" value={brutoMontaza} onChange={e => setBrutoMontaza(e.target.value)}/>
                    </Col>
                    </Row><br/>
                    <div className="text-center">
                        <Button color="danger" type="button">Dodaj</Button>
                    </div>
                </Form>
        </>
    );
}

export default Ekipe;