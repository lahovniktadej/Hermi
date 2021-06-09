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
    Col
} from 'reactstrap';

function AddEkipa(props) {
    const [dropdowns, setDropdowns] = React.useState({
        sofer: "Izberi šoferja",
        vozilo: "Izberi vozilo"
    })

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

    const SoferItem = (data) => {
        return (
            <DropdownItem onClick={() => changeSofer(data.sofer)}>
                <span>{data.sofer.ime + " " + data.sofer.priimek}</span>
            </DropdownItem>
        );
    }

    const VoziloItem = (data) => {
        return (
            <DropdownItem onClick={() => changeVozilo(data.vozilo)}>
                <span>{data.vozilo.naziv}</span>
            </DropdownItem>
        );
    }

    const changeSofer = (sofer) => {
        setDropdowns({
            ...dropdowns,
            sofer: sofer.ime + " " + sofer.priimek
        });
        props.spremeniSoferja(sofer);
    }

    const changeVozilo = (vozilo) => {
        setDropdowns({
            ...dropdowns,
            vozilo: vozilo.naziv
        });
        props.spremeniVozilo(vozilo);
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
                <UncontrolledDropdown className="d-block">
                    <DropdownToggle color="secondary">
                        <span>{dropdowns.sofer}</span>
                        <i class="fas fa-caret-down"></i>
                        </DropdownToggle>
                    <DropdownMenu>
                        {props.delavci.map((delavec) => { return <SoferItem sofer={delavec} /> })}
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="my-2">
                    <DropdownToggle color="secondary">
                        <span>{dropdowns.vozilo}</span>
                        <i class="fas fa-caret-down"></i>
                        </DropdownToggle>
                    <DropdownMenu>
                        {props.vozila.map((vozilo) => { return <VoziloItem vozilo={vozilo} /> })}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Col>
        </Row>
    );
}

export default AddEkipa;