import React, {useState} from 'react';

import {
    Button,
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
} from "reactstrap";


function ExcelExport(props) {

    const [modal, setModal] = useState();
    const toggle = () => setModal(!modal);

    const pridobiStatus = (status) => {
        if(status)
            return { backgroundColor: '#2dce89',  border: '1px solid black'};
        else 
            return { backgroundColor: '#f5365c', border: '1px solid black' };   
    }
    
    const handleBody = () => {
        toggle();
    }

    function excel(id){
        let downloadLink;
        let dataType = 'data:text/csv; charset=utf-8,';
        let tableSelect = document.getElementById(id);
        let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        let filename = 'analiza.xls';
        let universalBOM = "\uFEFF";
        
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            let blob = new Blob(["\uFEFF", tableHTML], {encoding:"UTF-8",type:"text/plain;charset=UTF-8"});
            navigator.msSaveOrOpenBlob(blob, filename);
        }else{
            downloadLink.href = 'data:' + dataType + (universalBOM+tableHTML);
            downloadLink.download = filename;
            downloadLink.click();
        }
    }

    const tableRow = (el) => {
        return (
            <tr>
                <td style={pridobiStatus(el.status)}></td>     
                <td style={{border: '1px solid black' }}>{el.sifraNaloga} &nbsp;</td>  
                <td style={{border: '1px solid black' }}>{el.objekt}</td>  
                <td style={{border: '1px solid black' }}>{new Date(el.datum).toLocaleString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>              
                <td style={{border: '1px solid black' }}>{el.avto}</td>
                <td style={{border: '1px solid black' }}>{el.sofer.ime} {el.sofer.priimek}</td>
                <td style={{border: '1px solid black' }}>{el.delavci.map((delavec, i, arr)=> {if(i!==arr.length-1) return delavec.ime +" " +delavec.priimek +", "; else return delavec.ime +" " +delavec.priimek;})}</td>
                <td style={{border: '1px solid black' }}>{(el.start).slice(0, 5)}</td>
                <td style={{border: '1px solid black' }}>{(el.pricetekDela).slice(0, 5)}</td>
                <td style={{border: '1px solid black' }}>{(el.konecDela).slice(0, 5)}</td>
                <td style={{border: '1px solid black' }}>{(el.prihod).slice(0, 5)}</td>
                <td style={{border: '1px solid black' }}>{(el.netoDelo).toString().replace('.', ',')}</td>
                <td style={{border: '1px solid black' }}>{(el.odsotnoDelavca).toString().replace('.', ',')}</td>
                <td style={{border: '1px solid black' }}>{(el.odsotnostSoferja).toString().replace('.', ',')}</td>
                <td style={{border: '1px solid black' }}>{(el.netoMontaza).toString().replace('.', ',')}</td>
                <td style={{border: '1px solid black' }}>{(el.brutoMontaza).toString().replace('.', ',')}</td>
            </tr>
     
        );
    };
    return(
        <>  
            <Button center color="danger" onClick={function(){ handleBody();}}>Prenesi kot XSL</Button>
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}><h2>Pregled tabele</h2></ModalHeader>
                <ModalBody>
                <table class="table table-bordered table-responsive" id="table">
                        <thead className="thead-light" >
                                <th scope="col" style={{border: '1px solid black' }}>Status</th>
                                <th scope="col" style={{border: '1px solid black' }}>Šifra</th> 
                                <th scope="col" style={{border: '1px solid black' }}>Objekt</th>
                                <th scope="col" style={{border: '1px solid black' }}>Datum</th>
                                <th scope="col" style={{border: '1px solid black' }}>Avto</th>
                                <th scope="col" style={{border: '1px solid black' }}>Šofer</th>
                                <th scope="col" style={{border: '1px solid black' }}>Delavci</th>
                                <th scope="col" style={{border: '1px solid black' }}>START</th>
                                <th scope="col" style={{border: '1px solid black' }}>Pričetek</th>
                                <th scope="col" style={{border: '1px solid black' }}>Konec</th>
                                <th scope="col" style={{border: '1px solid black' }}>PRIHOD</th>
                                <th scope="col" style={{border: '1px solid black' }}>NETO čas delavca</th>
                                <th scope="col" style={{border: '1px solid black' }}>Odsotnost šoferja</th>
                                <th scope="col" style={{border: '1px solid black' }}>Odsotnost delavca</th>
                                <th scope="col" style={{border: '1px solid black' }}>NETO montaža</th>
                                <th scope="col" style={{border: '1px solid black' }}>BRUTO montaža</th>                     
                        </thead>
                        <tbody> 
                            {(props.data!=null)?props.data.map((el) => tableRow(el)):<></>}
                            <tr>
                               {(props.montaza) ? <td colspan="2" style={{border: '1px solid black' }}><b>Skupen neto čas montaže:</b></td> : <td colspan="2" style={{border: '1px solid black' }}><b>Skupen neto čas delavca {props.delavec.ime + " " + props.delavec.priimek}:</b></td>}
                                <td style={{border: '1px solid black' }}>{(props.neto===undefined)?props.neto:(props.neto).toString().replace('.', ',')}</td>
                            </tr>
                            <tr>
                                {(props.montaza) ? <td style={{border: '1px solid black' }} colspan="2"><b>Skupen bruto čas montaže:</b></td> : <td colspan="2" style={{border: '1px solid black' }}><b>Skupen bruto čas delavca  {props.delavec.ime + " " + props.delavec.priimek}:</b></td>}
                                <td style={{border: '1px solid black' }}>{(props.bruto===undefined)?props.bruto:(props.bruto).toString().replace('.', ',')}</td>
                            </tr>
                        </tbody>
                    </table><br/>
                    <div className="text-center">
                       <Button className="btn btn-danger" onClick={() => {excel("table")}}>Prenesi</Button>
                    </div> 
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Zapri</Button>
                </ModalFooter>
            </Modal>                           
        </>

    );
}
export default ExcelExport;