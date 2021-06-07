import React from 'react';

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ListGroup,
    ListGroupItem,
    Button,
    Row,
    Col,
    FormGroup,
    Input
} from 'reactstrap';

function AddEkipa(props) {
    let soferIndex = props.delavci.findIndex((el) => {return el.id == props.ekipa.sofer.id});

    const DelavecListItem = (data) => {
        return (
            <ListGroupItem>
                <span>{data.delavec.ime + " " + data.delavec.priimek}</span>
                <Button color size="sm" className="float-right" onClick={() => props.odstraniDelavca(data.delavec)}>
                    <i class="fas fa-times"></i>
                </Button>
            </ListGroupItem>
        );
    }

    const DelavecItem = (data) => {
        return (
            <DropdownItem onClick={() => props.dodajDelavca(data.delavec)}>
                <span>{data.delavec.ime + " " + data.delavec.priimek}</span>
            </DropdownItem>
        );
    }

    const soferChange = (el) => {
        const index = el.target.value;
        props.spremeniSoferja(index);
        soferIndex = index;
    }

    return (
        <Row className="justify-content-md-center">
            <Col lg="4">
                <label className="form-control-label" htmlFor="sofer" >Delavci</label>
                <div className="text-center">
                    <ListGroup>
                        {props.ekipa.delavci.map((delavec) => { return <DelavecListItem delavec={delavec} /> })}
                    </ListGroup>
                    <UncontrolledDropdown className="my-2">
                        <DropdownToggle color><i class="fas fa-plus"></i></DropdownToggle>
                        <DropdownMenu>
                            {
                                props.delavci
                                    .filter((val) => { return !props.ekipa.delavci.includes(val) })
                                    .map((delavec) => { return <DelavecItem delavec={delavec} /> })
                            }
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </Col>
            <Col lg="4">
                <FormGroup>
                    <label className="form-control-label d-inline">
                        <span>Šofer</span>
                        <Input className="form-control-alternative" type="select" required value={soferIndex} onChange={soferChange} >
                            {props.delavci.map((delavec, index) => { return <option value={index}>{delavec.ime + " " + delavec.priimek}</option> })}
                        </Input>
                    </label>
                </FormGroup>
            </Col>
        </Row>
    );
}

export default AddEkipa;