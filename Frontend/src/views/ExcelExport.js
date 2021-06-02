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

import ReactHTMLTableToExcel from "react-html-table-to-excel";


function ExcelExport(props) {

    const [modal, setModal] = useState();
    const [modalBody, setModalBody] = useState();
    const toggle = () => setModal(!modal);

    const pridobiStatus = (status) => {
        if(status === "aktiven")
            return { backgroundColor: '#f5365c'};
        else 
            return { backgroundColor: '#2dce89'};   
    }
    
    const handleBody = (el) => {
        toggle();
        setModalBody(excel());
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
    const excel = () => {
        return (
            <>
                <Table className="align-items-center table-flush text-center" responsive id="table">
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
                <ReactHTMLTableToExcel className="btn btn-danger" table="table" filename="analiza" buttonText="Prenesi"/
            ></div> 
        </>
        
        );
    };
    return(
        <>  
            <Button center color="danger" onClick={function(){ handleBody();}}>Prenesi kot XSL</Button>
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}><h2>Podrobnosti</h2></ModalHeader>
                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>Zapri</Button>
                </ModalFooter>
            </Modal>
             
        </>

    );
}
export default ExcelExport;