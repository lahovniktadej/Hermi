import React, { useState } from 'react';

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
    ListGroupItemText,
} from "reactstrap";

import Header from 'components/Headers/Header';
import { Dropdown } from 'bootstrap';

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
        status: "aktiven"

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
        status: "končan"

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
        status: "aktiven"
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
        status: "končan"

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
        status: "aktiven"

    },
];

function Ekipe() {

    const [delavci, setDelavci] = useState(["", ""]);

    const pridobiStatus = (status) => {
        if(status == "aktiven")
            return "text-red";
        else
            return "text-green";
    }

    const handleAddClick = () =>{
        let list = delavci;
        list.push("");
        setDelavci(list);
    };

    const handleRemoveClick = () => {
        let list = delavci;
        list.pop();
        setDelavci(list);
    };

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
                
            </tr>
        );
    };

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Ekipe, ki so bile vnešene včeraj</h3>
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
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((el) => tableRow(el))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
                <Row>               
                    <Col>
                        <Card className="shadow bg-secondary">
                            <CardHeader>
                                <h3 className="mb-0">Dodaj ekipo</h3>
                            </CardHeader>
                            <CardBody>
                                <Form role="form">
                                <Row>
                                    <Col className="mb-4">
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-objekt">
                                            Objekt
                                        </label>
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
                                    </Col>
                                    <Col className="mb-4">
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-avto">
                                            Avto</label>
                                        <Input
                                            id="input-avto"
                                            className="form-control-alternative"
                                            type="select"
                                        >
                                            <option>avto1</option>
                                            <option>avto2</option>
                                            <option>avtot3</option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-4">
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-sofer"
                                        >
                                            Šofer</label>
                                        <Input
                                            id="input-sofer"
                                            className="form-control-alternative"
                                            type="select"
                                        >
                                            <option>sofer1</option>
                                            <option>sofer2</option>
                                            <option>sofer3</option>
                                        </Input>
                                    </FormGroup>
                                    </Col>
                                    </Row>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-delavci"
                                        >
                                            Delavci</label>
                                        {delavci.map(() => {
                                            return(
                                                <Row>
                                                    <InputGroup id = "input-delavci">
                                                    <Col className="mb-4">
                                                    <Input
                                                        id="input-delavci"
                                                        className="form-control-alternative"
                                                        type="select"
                                                    >
                                                        <option>delavec1</option>
                                                        <option>delavec2</option>
                                                        <option>delavec3</option>
                                                    </Input>
                                                    </Col>
                                                    <Col className="mb-4">
                                                    <Button color="primary" onClick={handleRemoveClick}>-</Button>
                                                    </Col>
                                                    </InputGroup>
                                                </Row>
                                            );
                                        })}
                                       <Button color="primary" onClick={handleAddClick}>+</Button>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-date">
                                            Datum</label>
                                        <Input
                                            id="input-date"
                                            className="form-control-alternative"
                                            type="date"
                                        /> 
                                    </FormGroup>
                                    <Row>
                                    <Col className="mb-3">
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-start"
                                        >
                                            START</label>
                                        <Input
                                            id="input-start"
                                            className="form-control-alternative"
                                            type="time"
                                        />
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-3">
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-zacetek"
                                        >
                                            Začetek dela</label>
                                        <Input
                                            id="input-zacetek"
                                            className="form-control-alternative"
                                            type="time"
                                        />
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-3">
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-konec"
                                        >
                                            Konec dela</label>
                                        <Input
                                            id="input-konec"
                                            className="form-control-alternative"
                                            type="time"
                                        />
                                    </FormGroup>
                                    </Col>
                                    <Col className="mb-3">
                                    <FormGroup className="mb-3">
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-prihod"
                                        >
                                            PRIHOD</label>
                                        <Input
                                            id="input-prihod"
                                            className="form-control-alternative"
                                            type="time"
                                        />
                                    </FormGroup>
                                    </Col>
                                    </Row>
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-status"
                                        >
                                            Status</label>
                                        <FormGroup check>
                                        <label>
                                            <Input type="radio" name="status"/>
                                               Aktiven
                                         </label>
                                        </FormGroup>
                                        <FormGroup check>
                                        <label>
                                            <Input type="radio" name="status"/>
                                               Končan
                                         </label>
                                        </FormGroup>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button color="primary" type="button">Dodaj</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Ekipe;