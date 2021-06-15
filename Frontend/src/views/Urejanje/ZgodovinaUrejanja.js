import React from 'react';

import {
    Container,
    Row,
    Col
} from "reactstrap";
import Header from 'components/Headers/Header';
import DelavciUrejanje from "views/Urejanje/Delavci";
import EkipeUrejanje from "views/Urejanje/Ekipe";
import NalogiUrejanje from "views/Urejanje/Nalogi";
import VozilaUrejanje from "views/Urejanje/Vozila";

function ZgodovinaUrejanja() {

    return (
        <>
         <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col>
                        <VozilaUrejanje />
                    </Col>
                    <Col>
                        <DelavciUrejanje />
                    </Col>
                </Row>
                <br/>
                    <NalogiUrejanje /><br/>
                <Row>
                    <Col>
                        <EkipeUrejanje />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ZgodovinaUrejanja;