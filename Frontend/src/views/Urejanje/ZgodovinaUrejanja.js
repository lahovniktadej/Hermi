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
    CardBody
} from "reactstrap";
import Header from 'components/Headers/Header';
import axios from 'axios';
import PaginationStrip from 'views/common/PaginationStrip';

function ZgodovinaUrejanja() {
    const [logging, setLogging] = useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(5);

    React.useEffect(() => {
        axios.get(`/api/logger`, { params: { page: 0, perPage: perPage } })
        .then((res) => {
            const log = res.data.content;
            setTotalPages(res.data.totalPages);
            setLogging(log);
        });
    }, [perPage]);

    const changePage = (page) => {
        axios.get(`/api/logger`, { params: { page: page, perPage: perPage } })
            .then((res) => {
                const log = res.data.content;
                setTotalPages(res.data.totalPages);
                setLogging(log);
            });
    }
    const tableRow = (el) => {
        return (
            <tr>            
                <td>{new Date(el.timeStamp).toLocaleString("en-GB")}</td>
                <td>{el.sprememba}</td>
                <td> {(el.originalniPodatki!=="/")? (Object.entries(JSON.parse(el.originalniPodatki))).map(entry => <><b>{entry[0]}</b>: {entry[1]}<br/></>) : el.originalniPodatki }</td>
                <td> {(el.noviPodatki!=="/")? (Object.entries(JSON.parse(el.noviPodatki))).map(entry => <><b>{entry[0]}</b>: {entry[1]}<br/></>) : el.noviPodatki }</td>
                <td>{el.emailSkrbnika}</td>
            </tr>
     
        );
    };

    return (
        <>
         <Header />
            <Container className="mt--7" fluid>
            <Card className="shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Spremembe</h3>
                </CardHeader> 
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
                <Table className="align-items-center table-flush text-center" responsive>
                    <thead className="thead-light">
                        <th scope="col">Čas spremembe</th>
                        <th scope="col">Srememba</th> 
                        <th scope="col">Originalni podatki</th>
                        <th scope="col">Novi podatki</th>
                        <th scope="col">Email skrbnika</th>
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
            </Container>

        </>
    );
}

export default ZgodovinaUrejanja;