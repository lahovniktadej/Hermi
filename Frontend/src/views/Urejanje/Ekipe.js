import React, { useState } from 'react';

import {
    Container,
    Table,
    Card,
    CardHeader,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    CardFooter,
    CardBody,
    Col,
    Row
} from "reactstrap";
import Header from 'components/Headers/Header';
import axios from 'axios';
import PaginationStrip from 'views/common/PaginationStrip';

function Ekipe() {
    const [logging, setLogging] = useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(5);

    React.useEffect(() => {
        axios.get(`/api/ekipa`, { params: { page: 0, perPage: perPage } })
        .then((res) => {
            const log = res.data.content;
            setTotalPages(res.data.totalPages);
            setLogging(log);
        });
    }, [perPage]);

    const changePage = (page) => {
        axios.get(`/api/ekipa`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const log = res.data.content;
                setTotalPages(res.data.totalPages);
                setLogging(log);
            });
    }
    const tableRow = (el) => {
        return (
            <tr>     
                <td>{el.spremenil}</td>
                <td>{new Date(el.timestamp).toLocaleString("en-GB")}</td>       
                <td>{el.operation}</td>             
                <td>
                    <b>ID:</b> {el.id}<br/>
                    <b>Šofer:</b> {el.sofer.ime} {el.sofer.priimek}<br/>
                    <b>Delavci:</b><br/>
                    {el.delavci.map((delavec)=><>{delavec.ime} {delavec.priimek}<br/></>)}
                    <b>Datum:</b> {el.datum}<br/>
                    <br/>
                </td>      
            </tr>
     
        );
    };

    return (
        <>
            <Card className="shadow">
            <CardHeader className="border-0">
                <Row>
                    <Col>    
                        <h3 className="mb-0">Ekipe</h3>
                    </Col>
                    <Col className="text-right">
                        <UncontrolledDropdown>
                            <CardBody>
                                <DropdownToggle size="sm">
                                    <span>Št. na stran: {perPage}</span>
                                    <i class="fas fa-caret-down"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setPerPage(5)}>5</DropdownItem>
                                    <DropdownItem onClick={() => setPerPage(10)}>10</DropdownItem>
                                    <DropdownItem onClick={() => setPerPage(15)}>15</DropdownItem>
                                </DropdownMenu>
                            </CardBody>
                        </UncontrolledDropdown>
                    </Col>
                </Row>
                </CardHeader>
                <Table className="align-items-center table-flush text-center" responsive size="sm">
                    <thead className="thead-light">
                        <th scope="col">Nazadnje spreminjal</th> 
                        <th scope="col">Čas zadnje spremembe</th>
                        <th scope="col">Tip spremembe</th>
                        <th scope="col">Trenutni podatki</th>
                    </thead>
                    <tbody>
                        {(logging!=null)?logging.map((el) => tableRow(el)):<></>}
                    </tbody>
                </Table>
                {
                    (totalPages > 1) ? (
                        <CardFooter>
                            <PaginationStrip onChange={changePage} totalPages={totalPages} />
                        </CardFooter>
                    ) : <></>
                }
            </Card>
        </>
    );
}

export default Ekipe;