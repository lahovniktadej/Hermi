import React, {useState} from 'react';

import {
    Card,
    CardHeader,
    Media,
    Table,
    Container,
    CardBody,
    FormGroup,
    Form,
    Input,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
} from "reactstrap";

import Header from 'components/Headers/Header';
import Export  from 'views/ExcelExport';

const data = [
    {
        sifraNaloga:"sifra1",
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
        sifraNaloga:"sifra2",
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
        sifraNaloga:"sifra3",
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
        sifraNaloga:"sifra3",
        objekt: "objekt1",
        datum: "2021-05-22",
        avto: "avto",
        sofer: "delavec2",
        delavci:  ["delavec1"],
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
    {   sifraNaloga:"sifra4",
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
    const [sifre] = useState(["sifra1", "sifra2", "sifra3", "sifra4"]);

    const [obdobjeOD, setObdobjeOD] = useState("");
    const [obdobjeDO, setObdobjeDO] = useState("");
    const [iskanObjekt, setObjekt] = useState("X");
    const [delavec, setDelavec] = useState("X");
    const [sifra, setSifra] = useState("X");
    const [status, setStatus] = useState("X");


    const[neto, setNeto] = useState();
    const[bruto, setBruto] = useState();
    const[montaza, setMontaza] = useState(true);

    const handleMontaza = (iskaniPodatki) => {
        let casNeto = iskaniPodatki.map((data) => data.netoMontaza);
        let casBruto = iskaniPodatki.map((data) => data.brutoMontaza);
        let sestevekNeto = casNeto.reduce((a, b) => a + b, 0);
        let sestevekBruto = casBruto.reduce((a, b) => a + b, 0);
        setNeto(sestevekNeto);
        setBruto(sestevekBruto);
        return (
            <>
             <tr>
                <td colspan="2"><b>Skupen neto čas montaže:</b></td>
                <td>{sestevekNeto}</td>
            </tr>
            <tr>
                <td colspan="2"><b>Skupen bruto čas montaže:</b> </td>
                <td>{sestevekBruto}</td>
            </tr>
            </>
        );
    }

    const handleBody = (el) => {
        toggle();
        setModalBody(izpisiCase(el));
    }

    const toggle = () => setModal(!modal);

    React.useEffect(() => {
        handleMontaza(vsiPodatki);
        handleFiltriranje();
    },[iskanObjekt, sifra, delavec, status, obdobjeOD, obdobjeDO]);

    const handleDelavec=(iskaniPodatki)=>{
        let odsotnostSofer = iskaniPodatki.map((podatek) => {if(podatek.sofer===delavec) { return podatek.odsotnostSoferja } else return 0; });
        let netoDelavec = iskaniPodatki.map((podatek)=> {return (podatek.delavci.map((iskanDelavec)=>{if(podatek.sofer===delavec) { return podatek.netoCas; } else if(iskanDelavec===delavec || podatek.sofer===delavec) { return podatek.netoCas; }  else return 0; }))})
        let brutoDelavec = iskaniPodatki.map((podatek)=> podatek.delavci.map((iskanDelavec)=>{if(iskanDelavec===delavec) return podatek.odsotnoDelavca;  else return 0;}))
        console.log(netoDelavec)
        netoDelavec = netoDelavec.map((neto) => neto.reduce((a, b) => a + b, 0));
        console.log(netoDelavec)
        brutoDelavec = brutoDelavec.map((bruto) => bruto.reduce((a, b) => a + b, 0));
        let skupenNeto =  netoDelavec.reduce((a, b) => a + b, 0);
        let skupenBruto = (brutoDelavec.reduce((a, b) => a + b, 0)) + (odsotnostSofer.reduce((a, b) => a + b, 0));
        setNeto(skupenNeto);
        setBruto(skupenBruto);        
    }

    const handleFiltriranje=()=>{
        let iskaniPodatki = vsiPodatki;

        if(delavec !== "X"){
            iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.sofer === delavec);
            let falseDelavci = vsiPodatki.filter((podatek) => (podatek.delavci.filter((iskanDelavec)=>{return(iskanDelavec===delavec);})) == false); //vem da je tag annoying ampak zaenkrat s tremi ne dela, ne dodajat, hvala <3
            let iskaniDelavci = vsiPodatki.filter((podatki) => !falseDelavci.includes(podatki));
            iskaniPodatki = iskaniPodatki.concat(iskaniDelavci);
       }

        if(obdobjeDO !== "" && obdobjeOD !== "")
            iskaniPodatki = iskaniPodatki.filter((podatek) => ( new Date(obdobjeOD) <= new Date(podatek.datum) && new Date(obdobjeDO) >= new Date(podatek.datum)) === true); 
               
        if(sifra !== "X")
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.sifraNaloga === sifra));

        if(iskanObjekt !== "X")
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.objekt === iskanObjekt));

        if(status==="Aktiven")
            iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.status === "aktiven");
        else if(status==="Končan")
            iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.status === "končan");

        if(delavec !== "X"){
            handleDelavec(iskaniPodatki);
            setMontaza(false);
        }
        else{
            handleMontaza(iskaniPodatki);
            setMontaza(true);
        }
        
        setFiltriran(iskaniPodatki);
    }

    const pridobiStatus = (status) => {
        if(status === "aktiven")
            return "fas fa-ban text-red";
        else
            return "ni ni-check-bold text-green";
    }
    const izpisiCase = (el) => {
        let izpis = vsiPodatki.map((podatek)=>{
            if(podatek === el){
                return(
                    <>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                                <th scope="col">Objekt</th>
                                <th scope="col">Avto</th>
                                <th scope="col">Šofer</th>
                                <th scope="col">Delavci</th>
                                <th scope="col">START</th>
                                <th scope="col">Pričetek</th>
                                <th scope="col">Konec</th>
                                <th scope="col">PRIHOD</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{podatek.objekt}</td>
                                <td>{podatek.avto}</td>
                                <td>{podatek.sofer}</td>
                                <td>{podatek.delavci.map((delavec)=> <>{delavec}<br/></>)}</td>
                                <td>{podatek.start}</td>
                                <td>{podatek.pricetekDela}</td>
                                <td>{podatek.konecDela}</td>
                                <td>{podatek.prihod}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </>
                    );
            }
            else return null;
        })
        return izpis;
    }

    const tableRow = (el) => {
        return (
            <tr>
                <td><span className={pridobiStatus(el.status)}></span></td>     
                <th scope="row">
                    <Media className="align-items-center">
                        <span className="mb-0 text-sm">{el.sifraNaloga}</span>
                    </Media>
                </th>
                <td>{new Date(el.datum).toLocaleString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                <td>{el.netoCas}</td>
                <td>{el.odsotnostSoferja}</td>
                <td>{el.odsotnoDelavca}</td>
                <td>{el.netoMontaza}</td>
                <td>{el.brutoMontaza}</td>
                <td>
                    <Button size="sm" center color="secondary" onClick={function(){ handleBody(el);}}>Poglej</Button>
                    <Modal isOpen={modal} toggle={toggle} size="lg">
                        <ModalHeader toggle={toggle}><h2>Podrobnosti</h2></ModalHeader>
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
                        <h3 className="mb-0">Delo po dnevih</h3>
                    </CardHeader> 
                    <CardBody>
                    <Form role="form">
                        <UncontrolledDropdown>
                            <DropdownToggle>
                            <label className="h4" >            
                                Obdobje                        
                            </label>   
                            <i className="fas fa-caret-down"></i>    
                            </DropdownToggle> 
                            <DropdownMenu center>
                            <div class="alert alert-white">
                                <FormGroup>
                                    <label htmlFor="input-od">OD: {(obdobjeOD !== "") ? <> {new Date(obdobjeOD).toLocaleString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })}</>: <></>}</label>
                                    <Input id="input-od" className="form-control-alternative" type="date" onChange={e => setObdobjeOD(e.target.value)}/> 
                                </FormGroup>               
                                <FormGroup>
                                    <label htmlFor="input-do">DO: {(obdobjeDO !== "") ? <> {new Date(obdobjeDO).toLocaleString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })}</>: <></>}</label>
                                    <Input id="input-do"  className="form-control-alternative" type="date" onChange={e => setObdobjeDO(e.target.value)}/> 
                                </FormGroup>
                                <Button color="danger" onClick={function(){ setObdobjeOD(""); setObdobjeDO("")}}>Resetiraj</Button>
                            </div>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            <label className="h4">
                                    Objekt
                            </label>
                            <i className="fas fa-caret-down"></i>  
                        </DropdownToggle>
                        <DropdownMenu>
                            <FormGroup>
                            <div class="alert alert-white">
                                <Input id="input-date" value={iskanObjekt} className="form-control-alternative" type="select" onChange={e => setObjekt(e.target.value)}>
                                    <option>X</option>
                                    {objekti.map((objekt) => {return(<option>{objekt}</option>);})}
                                </Input>
                            </div>
                            </FormGroup>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            <label className="h4">
                                    Delavec
                            </label>
                            <i className="fas fa-caret-down"></i>  
                        </DropdownToggle>
                        <DropdownMenu>
                            <FormGroup>
                            <div class="alert alert-white">
                                <Input className="h4" value={delavec} id="input-date" type="select" onChange={e => setDelavec(e.target.value)}>
                                    <option>X</option>
                                    {delavci.map((delavec) => {return(<option>{delavec}</option>);})}
                                </Input>
                            </div>
                            </FormGroup>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            <label className="h4">
                                    Šifra
                            </label>
                            <i className="fas fa-caret-down"></i>  
                        </DropdownToggle>
                        <DropdownMenu>
                            <FormGroup>
                            <div class="alert alert-white">
                                <Input className="h4" value={sifra} id="input-date" type="select" onChange={e => setSifra(e.target.value)}>
                                    <option>X</option>   
                                    {sifre.map((sifra) => {return(<option>{sifra}</option>);})}
                                </Input>
                            </div>
                            </FormGroup>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            <label className="h4">
                                Status
                            </label>
                            <i className="fas fa-caret-down"></i>  
                        </DropdownToggle>
                        <DropdownMenu>
                            <FormGroup>
                            <div class="alert alert-white">
                                <FormGroup check>
                                    <label check>
                                        <Input type="select" name="status" checked={status}  onChange={e=>setStatus(e.target.value)}>
                                            <option>X</option> 
                                            <option>Aktiven</option> 
                                            <option>Končan</option> 
                                        </Input>
                                    </label>
                                </FormGroup>
                            </div>
                            </FormGroup>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </Form><br/>                   
                    <Table className="align-items-center table-flush text-center" responsive >
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Šifra</th> 
                            <th scope="col">Datum</th>
                            <th scope="col">NETO čas delavca</th>
                            <th scope="col">Odsotnost šoferja</th>
                            <th scope="col">Odsotnost delavca</th>
                            <th scope="col">NETO montaža</th>
                            <th scope="col">BRUTO montaža</th>
                            <th scope="col">Podrobnosti</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrirani.map((el) => tableRow(el))}
                            <tr>
                               {(montaza) ? <td colspan="2"><b>Skupen neto čas montaže:</b></td> : <td colspan="2"><b>Skupen neto čas delavca {delavec}:</b></td>}
                                <td>{neto}</td>
                            </tr>
                            <tr>
                                {(montaza) ? <td colspan="2"><b>Skupen bruto čas montaže:</b></td> : <td colspan="2"><b>Skupen bruto čas delavca {delavec}:</b></td>}
                                <td>{bruto}</td>
                            </tr>
                        </tbody>
                    </Table><br/>
                    <div className="text-right">
                       <Export data={filtrirani} bruto={bruto} neto={neto}/>
                    </div>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default Izpis;