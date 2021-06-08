import React, {useState} from 'react';
import axios from 'axios';

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
    CardFooter
} from "reactstrap";

import Header from 'components/Headers/Header';
import Export  from 'views/ExcelExport';

function Izpis() {

    const [vsiPodatki, setPodatki] = useState();
    const [filtrirani, setFiltriran] = useState();

    const [modal, setModal] = useState();
    const [modalBody, setModalBody] = useState();
    
    const [delavci, setDelavci] = useState([]);
    const [objekti, setObjekti] = useState([]);
    const [sifre, setSifre] = useState([]);

    const [obdobjeOD, setObdobjeOD] = useState("");
    const [obdobjeDO, setObdobjeDO] = useState("");
    const [iskanObjekt, setObjekt] = useState("X");
    const [delavec, setDelavec] = useState("X");
    const [sifra, setSifra] = useState("X");
    const [status, setStatus] = useState("X");


    const[neto, setNeto] = useState();
    const[bruto, setBruto] = useState();
    const[montaza, setMontaza] = useState(true);

    React.useEffect(() => {
        axios.get(`/api/delavec`)
        .then((res) => {
            const delavci = res.data;
            setDelavci(delavci);
        });
        axios.get(`/api/delovniNalog`)
        .then((res) => {
            const nalogi = res.data;
            if(nalogi != null){
                axios.get(`/api/ekipa`)
                .then((resEkipe) => {
                    if(resEkipe.data != null){
                        let podatki = [];
                        nalogi.forEach((nalog)=> nalog.ekipe.forEach((ekipa)=>podatki.push({id:ekipa.id, sifraNaloga:nalog.sifra, objekt:nalog.objekt, datum:ekipa.datum, sofer:ekipa.sofer, delavci:ekipa.delavci, start:ekipa.start, konec:ekipa.konec, pricetekDela:ekipa.pricetekDela, konecDela:ekipa.konecDela, netoCas:ekipa.netoDelo, netoMontaza:ekipa.netoMontaza})));
                        let objekti = podatki.map((podatek) => podatek.objekt);
                        let razlicniObjekti = [...new Set(objekti)];
                        let sifre = nalogi.map((nalog)=>nalog.sifra);    
                        sifre = [...new Set(sifre)];
                        setPodatki(podatki);
                        setFiltriran(podatki);
                        setSifre(sifre);
                        setObjekti(razlicniObjekti);
                    }
                })  
            }
        });
        
    },[]);

    const handleMontaza = (iskaniPodatki) => {
        let sestevekNeto;
        let sestevekBruto
        if(iskaniPodatki!=null){
            let casNeto = iskaniPodatki.map((data) => data.netoMontaza);
            let casBruto = iskaniPodatki.map((data) => data.brutoMontaza);
            sestevekNeto = casNeto.reduce((a, b) => a + b, 0);
            sestevekBruto = casBruto.reduce((a, b) => a + b, 0);
        }
        else{
            sestevekNeto=0;
            sestevekBruto=0;
        }
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

    const handleBodySifranti = (el) => {
        toggle();
        setModalBody(izpisiSifrante(el));
    }
    const handleBodyCasi = (el) => {
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
        netoDelavec = netoDelavec.map((neto) => neto.reduce((a, b) => a + b, 0));
        brutoDelavec = brutoDelavec.map((bruto) => bruto.reduce((a, b) => a + b, 0));
        let skupenNeto =  netoDelavec.reduce((a, b) => a + b, 0);
        let skupenBruto = (brutoDelavec.reduce((a, b) => a + b, 0)) + (odsotnostSofer.reduce((a, b) => a + b, 0));
        setNeto(skupenNeto);
        setBruto(skupenBruto);        
    }

    const handleFiltriranje=()=>{
        let iskaniPodatki = vsiPodatki;
       
        if(delavec !== "X"){
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.sofer.ime + " " + podatek.sofer.priimek)=== delavec);
            let falseDelavci = vsiPodatki.filter((podatek) => (podatek.delavci.filter((iskanDelavec)=>{return((iskanDelavec.ime + " " + iskanDelavec.priimek)===delavec);})) == false); 
            let iskaniDelavci = vsiPodatki.filter((podatki) => !falseDelavci.includes(podatki));
            iskaniPodatki = iskaniPodatki.concat(iskaniDelavci);
            iskaniPodatki = [...new Set(iskaniPodatki)];   
       }

        if(obdobjeDO !== "" && obdobjeOD !== "")
            iskaniPodatki = iskaniPodatki.filter((podatek) => ( new Date(obdobjeOD) <= new Date(podatek.datum) && new Date(obdobjeDO) >= new Date(podatek.datum)) === true); 
               
        if(sifra !== "X")
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.sifraNaloga === sifra));

        if(iskanObjekt !== "X")
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.objekt === iskanObjekt));

        if(status==="Aktiven")
            iskaniPodatki = iskaniPodatki.filter((podatek) => (!podatek.status));
        else if(status==="Končan")
            iskaniPodatki = iskaniPodatki.filter((podatek) => (podatek.status));

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
        if(status)
            return "fas fa-circle fa-xs text-green";
        else
            return "fas fa-circle fa-xs text-red";
    }
    const izpisiCase = (el) => {
        let izpis = vsiPodatki.map((podatek)=>{
            if(podatek === el){
                return(
                    <>
                    <Table className="align-items-center table-flush text-center" responsive>
                        <thead className="thead-light">
                                <th scope="col">START</th>
                                <th scope="col">Pričetek</th>
                                <th scope="col">Konec</th>
                                <th scope="col">PRIHOD</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{podatek.start}</td>
                                <td>{podatek.pricetekDela}</td>
                                <td>{podatek.konecDela}</td>
                                <td>{podatek.konec}</td>
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
    const izpisiSifrante = (el) => {
        let izpis = vsiPodatki.map((podatek)=>{
            if(podatek === el){
                return(
                    <>
                    <Table className="align-items-center table-flush text-center" responsive>
                        <thead className="thead-light">
                                <th scope="col">Avto</th>
                                <th scope="col">Šofer</th>
                                <th scope="col">Delavci</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{podatek.avto}</td>
                                <td>{podatek.sofer.ime} {podatek.sofer.priimek}</td>
                                <td>{podatek.delavci.map((delavec)=> <>{delavec.ime} {delavec.priimek}<br/></>)}</td>
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
                <td>{el.objekt}</td>
                <td><Button size="sm" center color="secondary" onClick={function(){ handleBodySifranti(el);}}><i class="far fa-eye"></i></Button></td>
                <td><Button size="sm" center color="secondary" onClick={function(){ handleBodyCasi(el);}}><i class="far fa-eye"></i></Button></td>
                <td>{el.netoDelo}</td>
                <td>{el.odsotnostSoferja}</td>
                <td>{el.odsotnoDelavca}</td>
                <td>{el.netoMontaza}</td>
                <td>{el.brutoMontaza}</td>
                <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}><h2>Podrobnosti</h2></ModalHeader>
                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Zapri</Button>
                </ModalFooter>
            </Modal>
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
                                <Input className="form-control-alternative" value={delavec} id="input-date" type="select" onChange={e => setDelavec(e.target.value)}>
                                    <option>X</option>
                                    {delavci.map((iskanDelavec) => {return(<option>{iskanDelavec.ime} {iskanDelavec.priimek}</option>);})}
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
                                <Input className="form-control-alternative" value={sifra} id="input-date" type="select" onChange={e => setSifra(e.target.value)}>
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
                                        <Input type="select" className="form-control-alternative" name="status" checked={status}  onChange={e=>setStatus(e.target.value)}>
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
                    </Form> 
                    </CardBody>                 
                    <Table className="align-items-center table-flush text-center" responsive>
                        <thead className="thead-light">
                            <th scope="col">Status</th>
                            <th scope="col">Šifra</th> 
                            <th scope="col">Datum</th>
                            <th scope="col">Objekt</th>
                            <th scope="col">Šifranti</th>
                            <th scope="col">Delovni<br/>časi</th>
                            <th scope="col">NETO čas<br/>delavca</th>
                            <th scope="col">Odsotnost<br/>šoferja</th>
                            <th scope="col">Odsotnost<br/>delavca</th>
                            <th scope="col">NETO<br/>montaža</th>
                            <th scope="col">BRUTO<br/>montaža</th>
                        </thead>
                        <tbody>
                            {(filtrirani!=null)?filtrirani.map((el) => tableRow(el)):<></>}
                            <tr>
                               {(montaza) ? <td colspan="2"><b>Skupen neto čas montaže:</b></td> : <td colspan="2"><b>Skupen neto čas delavca {delavec}:</b></td>}
                                <td>{neto}</td>
                            </tr>
                            <tr>
                                {(montaza) ? <td colspan="2"><b>Skupen bruto čas montaže:</b></td> : <td colspan="2"><b>Skupen bruto čas delavca {delavec}:</b></td>}
                                <td>{bruto}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <CardFooter>
                        <div className="text-right">
                        <Export data={filtrirani} bruto={bruto} neto={neto} montaza={montaza} delavec={delavec}/>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
        </>
    );
}

export default Izpis;