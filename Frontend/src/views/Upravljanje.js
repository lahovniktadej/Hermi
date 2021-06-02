import React from 'react';

import {
    Row,
    Col,
} from "reactstrap";

import Delavci from "views/Delavci";
import Skrbniki from "views/Skrbniki";
import Vozila from "views/Vozila";

function Upravljanje() {
    return (
        <> 
            <Row className="management-container">
                <Col>
                    <Delavci />
                </Col>
                <Col>
                    <Vozila />
                </Col>
                <Col>
                    <Skrbniki />
                </Col>
            </Row>
        </>
    );
};

export default Upravljanje;