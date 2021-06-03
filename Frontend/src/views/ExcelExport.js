import React, {useState} from 'react';

import {
    Media,
    Table,
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
        if(status === "aktiven")
            return { backgroundColor: '#f5365c'};
        else 
            return { backgroundColor: '#2dce89'};   
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
                <th scope="row">
                    <Media className="align-items-center">
                        <span className="mb-0 text-sm">{el.sifraNaloga}</span>
                    </Media>
                </th>
                <td>{el.objekt}</td>  
                <td>{new Date(el.datum).toLocaleString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>              
                <td>{el.avto}</td>
                <td>{el.sofer}</td>
                <td>{el.delavci.map((delavec)=> <>{delavec} </>)}</td>
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
    return(
        <>  
            <Button center color="danger" onClick={function(){ handleBody();}}>Prenesi kot XSL</Button>
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}><h2>Pregled tabele</h2></ModalHeader>
                <ModalBody>
                <Table className="align-items-center table-flush text-center" id="table" responsive >
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Status</th>
                                <th scope="col">Šifra</th> 
                                <th scope="col">Objekt</th>
                                <th scope="col">Datum</th>
                                <th scope="col">Avto</th>
                                <th scope="col">Šofer</th>
                                <th scope="col">Delavci</th>
                                <th scope="col">START</th>
                                <th scope="col">Pričetek</th>
                                <th scope="col">Konec</th>
                                <th scope="col">PRIHOD</th>
                                <th scope="col">NETO čas delavca</th>
                                <th scope="col">Odsotnost šoferja</th>
                                <th scope="col">Odsotnost delavca</th>
                                <th scope="col">NETO montaža</th>
                                <th scope="col">BRUTO montaža</th>                     
                            </tr>
                        </thead>
                        <tbody> 
                            {props.data.map((el) => tableRow(el))}
                            <tr>
                                <td colspan="2"><b>Skupen neto čas montaže:</b></td>
                                <td>{props.neto}</td>
                            </tr>
                            <tr>
                                <td colspan="2"><b>Skupen bruto čas montaže:</b> </td>
                                <td>{props.bruto}</td>
                            </tr>
                        </tbody>
                    </Table><br/>
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