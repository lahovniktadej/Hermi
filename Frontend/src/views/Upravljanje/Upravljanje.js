import React from 'react';

import {
    Row,
    Col,
    Container,
} from "reactstrap";

import Delavci from "./Delavci";
import Skrbniki from "./Skrbniki";
import Vozila from "./Vozila";
import Header from 'components/Headers/Header';
import Nalogi from './Nalogi';

function Upravljanje() {
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5">
                        <Delavci />
                    </Col>
                    <Col className="mb-5">
                        <Vozila />
                    </Col>
                    <Col className="mb-5">
                        <Skrbniki />
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-5">
                        <Nalogi />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Upravljanje;