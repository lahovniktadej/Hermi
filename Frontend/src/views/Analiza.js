import React from 'react';

import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Button,
} from "reactstrap";

import Header from 'components/Headers/Header';

const data = [
    {
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
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
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
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
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
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
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
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
        objekt: "objekt",
        datum: "22.05.2021",
        avto: "avto",
        sofer: "priimekSoferja",
        delavci: "priimek1, priimek2",
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
];

function Analiza() {


    const pridobiStatus = (status) => {
        if(status == "aktiven")
            return "text-red";
        else
            return "text-green";
    }

    const tableRow = (el) => {
        return (
            <tr>
                <th scope="row">
                    <Media className="align-items-center">
                        <img
                            className="avatar rounded-circle mr-3"
                            alt="..."
                            src={
                                require("../assets/img/theme/bootstrap.jpg").default
                            }
                        />
                        <Media>
                            <span className="mb-0 text-sm">
                                {el.objekt}
                            </span>
                        </Media>
                    </Media>
                </th>
                <td><span className={pridobiStatus(el.status)}>{el.status}</span></td>      
                <td>{el.datum}</td>
                <td>{el.avto}</td>
                <td>{el.sofer}</td>
                <td>{el.delavci}</td>
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


    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="md-4">
                    <Form role="form">   
                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">                            
                            FILTER <span class="ni ni-bold-down"></span>
                        </a>
                        <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                            <FormGroup check>
                                        <label className="h3">
                                            <Input type="checkbox" name="filter"/>
                                              Obdobje:
                                        </label>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            htmlFor="input-od"
                                        >
                                        OD:</label>
                                        <Input
                                            id="input-od"
                                            className="form-control-alternative"
                                            type="date"
                                        /> 
                            </FormGroup>               
                            <FormGroup>
                                <label
                                    htmlFor="input-do"
                                >
                                DO:</label>
                                <Input
                                    id="input-do"
                                    className="form-control-alternative"
                                    type="date"
                                /> 
                            </FormGroup>
                            <FormGroup check>
                                <label className="h3">
                                    <Input type="checkbox" name="filter"/>
                                        Objekt:
                                </label>
                            </FormGroup>
                            <FormGroup>
                                <Input  
                                    id="input-date"
                                    className="form-control-alternative"
                                    type="select"
                                >
                                    <option>objekt1</option>
                                    <option>objekt2</option>
                                    <option>objekt3</option>
                                </Input>
                            </FormGroup>
                            <FormGroup check>
                                <label className="h3">
                                    <Input type="checkbox" name="filter"/>
                                        Delavec:
                                </label>
                            </FormGroup>
                            <FormGroup>
                                <Input  
                                    className="h2"
                                    id="input-date"
                                    className="form-control-alternative"
                                    type="select"
                                >
                                    <option>delavec1</option>
                                    <option>delavec2</option>
                                    <option>delavec3</option>
                                </Input>
                            </FormGroup>
                            <FormGroup check>
                                <label className="h3">
                                    <Input type="checkbox" name="filter"/>
                                        Status:
                                </label>
                            </FormGroup>
                            <FormGroup check>
                                <label>
                                    <Input type="radio" name="status"/>
                                        Aktiven
                                    </label>
                                </FormGroup>
                                <FormGroup check>
                                <label>
                                    <Input type="radio" name="status" checked/>
                                        Končan
                                    </label>
                            </FormGroup>
                            <Button color="primary" type="button">Filtriraj</Button>
                            </div>
                        </div>
                    </Form>
                    </Col>
                    <Col className="md-6"></Col>
                    </Row><br/>
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Zgodovina ekip</h3>
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
                                        <th scope="col">Pričetek dela</th>
                                        <th scope="col">Konec dela</th>
                                        <th scope="col">PRIHOD</th>
                                        <th scope="col">NETO čas dela</th>
                                        <th scope="col">Odsotnost šoferja</th>
                                        <th scope="col">Odsotnost delavca</th>
                                        <th scope="col">NETO montaža</th>
                                        <th scope="col">BRUTO montaža</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((el) => tableRow(el))}
                                </tbody>
                            </Table>
                        </Card><br/>
                        <Form role="form">
                           <Button color="primary" type="button">Shrani</Button>
                        </Form>
            </Container>
        </>
    );
}

export default Analiza;