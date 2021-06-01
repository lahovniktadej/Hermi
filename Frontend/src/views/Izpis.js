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

    const [obdobjeOD, setObdobjeOD] = useState();
    const [obdobjeDO, setObdobjeDO] = useState();
    const [iskanObjekt, setObjekt] = useState(objekti[0]);
    const [delavec, setDelavec] = useState(delavci[0]);
    const [sifra, setSifra] = useState(sifre[0]);
    const [aktiven, setAktiven] = useState(false); 
    const [koncan, setKoncan] = useState(false);

    const [obdobjeChecked, setObdobjeChecked] = useState(false);
    const [objektChecked, setObjektChecked] = useState(false);
    const [delavecChecked, setDelavecChecked] = useState(false);
    const [statusChecked, setStatusChecked] = useState(false);
    const [sifraChecked, setSifraChecked] = useState(false);

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
               
        if(delavecChecked){
             let iskaniPodatki = iskaniPodatki.filter((podatek) => podatek.sofer === delavec);
             let falseDelavci = vsiPodatki.filter((podatek) => (podatek.delavci.filter((iskanDelavec)=>{return(iskanDelavec===delavec);})) == false); //vem da je tag annoying ampak zaenkrat s tremi ne dela, ne dodajat, hvala <3
             let iskaniDelavci = vsiPodatki.filter((podatki) => !falseDelavci.includes(podatki));
             iskaniPodatki = iskaniPodatki.concat(iskaniDelavci);
        }

        if(sifraChecked)
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.sifraNaloga === sifra));

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
    const pridobiCasMontaza = (vrsta) => {
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
                <td>{el.odsotnoDelavca}</td>
                <td>{el.odsotnostSoferja}</td>
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
                        <h3 className="mb-0">Zgodovina ekip</h3>
                    </CardHeader> 
                    <CardBody>
                    <Form role="form" onSubmit={handleSubmit}>
                        <UncontrolledDropdown>
                            <DropdownToggle>
                            <FormGroup check>
                                <label className="h4" >            
                                    <Input type="checkbox" name="filter" defaultChecked={obdobjeChecked} onChange={e => setObdobjeChecked(e.target.checked)}/> 
                                    Obdobje                        
                                </label>   
                                <i className="fas fa-caret-down"></i>    
                            </FormGroup>
                            </DropdownToggle> 
                            <DropdownMenu center>
                            <div class="alert alert-white">
                                <FormGroup>
                                    <label htmlFor="input-od">OD:</label>
                                    <Input id="input-od" className="form-control-alternative" type="date" onChange={e => setObdobjeOD(e.target.valueAsDate)}/> 
                                </FormGroup>               
                                <FormGroup>
                                    <label htmlFor="input-do">DO:</label>
                                    <Input id="input-do" className="form-control-alternative" type="date" onChange={e => setObdobjeDO(e.target.valueAsDate)}/> 
                                </FormGroup>
                            </div>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            <FormGroup check>
                                <label className="h4">
                                    <Input type="checkbox" name="filter" defaultChecked={objektChecked} onChange={e => setObjektChecked(e.target.checked)}/>
                                        Objekt
                                </label>
                                <i className="fas fa-caret-down"></i>  
                            </FormGroup>
                        </DropdownToggle>
                        <DropdownMenu>
                            <FormGroup>
                            <div class="alert alert-white">
                                <Input id="input-date" className="form-control-alternative" type="select" onChange={e => setObjekt(e.target.value)}>
                                    {objekti.map((objekt) => {return(<option>{objekt}</option>);})}
                                </Input>
                            </div>
                            </FormGroup>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            <FormGroup check>
                                <label className="h4">
                                    <Input type="checkbox" name="filter" defaultChecked={delavecChecked} onChange={e => setDelavecChecked(e.target.checked)}/>
                                        Delavec
                                </label>
                                <i className="fas fa-caret-down"></i>  
                            </FormGroup>
                        </DropdownToggle>
                        <DropdownMenu>
                            <FormGroup>
                            <div class="alert alert-white">
                                <Input className="h4" id="input-date" type="select" onChange={e => setDelavec(e.target.value)}>
                                    {delavci.map((delavec) => {return(<option>{delavec}</option>);})}
                                </Input>
                            </div>
                            </FormGroup>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            <FormGroup check>
                                <label className="h4">
                                    <Input type="checkbox" name="filter" defaultChecked={sifraChecked} onChange={e => setSifraChecked(e.target.checked)}/>
                                        Šifra
                                </label>
                                <i className="fas fa-caret-down"></i>  
                            </FormGroup>
                        </DropdownToggle>
                        <DropdownMenu>
                            <FormGroup>
                            <div class="alert alert-white">
                                <Input className="h4" id="input-date" type="select" onChange={e => setSifra(e.target.value)}>
                                    {sifre.map((sifra) => {return(<option>{sifra}</option>);})}
                                </Input>
                            </div>
                            </FormGroup>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown>
                        <DropdownToggle>
                            <FormGroup check>
                                <label className="h4">
                                    <Input type="checkbox" name="filter" defaultChecked={statusChecked} onClick={e => setStatusChecked(e.target.checked)}/>
                                    Status
                                </label>
                                <i className="fas fa-caret-down"></i>  
                            </FormGroup>
                        </DropdownToggle>
                        <DropdownMenu>
                            <FormGroup>
                            <div class="alert alert-white">
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
                            </FormGroup>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        <Button color="danger" type="submit">Filtriraj</Button>
                    </Form><br/>                      
                    <Table className="align-items-center table-flush" responsive>
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
                                <td colspan="2"><b>Skupen neto čas montaže:</b></td>
                                <td>{pridobiCasMontaza("netoMontaza")}</td>
                            </tr>
                            <tr>
                                <td colspan="2"><b>Skupen bruto čas montaže:</b> </td>
                                <td>{pridobiCasMontaza("brutoMontaza")}</td>
                            </tr>
                        </tbody>
                    </Table><br/>
                    <Form role="form">
                        <div className="text-right"><Button color="danger" type="button">Shrani</Button></div>
                    </Form>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
}

export default Izpis;