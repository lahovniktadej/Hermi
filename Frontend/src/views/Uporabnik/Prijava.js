/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
  Container,
  FormText,
  Modal,
} from "reactstrap";

import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
require('firebase/auth');

//  Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_94J4ZIWevlT__Uc8bvnG1UZjnH0nQuc",
    authDomain: "hermi-dab7b.firebaseapp.com",
    projectId: "hermi-dab7b",
    storageBucket: "hermi-dab7b.appspot.com",
    messagingSenderId: "1063139661285",
    appId: "1:1063139661285:web:8ec0758dd5fe895e234b0c",
    measurementId: "G-TDKEQRNNW4"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

function Prijava() {
    let history = useHistory();

    if (sessionStorage.getItem("user_uid")) {
        history.push({
            pathname: `/admin/pregled`,
        });
    }

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [resetEmail, setResetEmail] = React.useState("");

    const [isError, setIsError] = React.useState("");
    const [resetModal, setResetModal] = React.useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleResetEmail = (event) => {
        setResetEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            let user = userCredential.user;
            let display = user.email;

            sessionStorage.setItem("user_uid", user.email);
            sessionStorage.setItem("user_display", display);

            history.push({
                pathname: `/admin/pregled`,
            });
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;

            setIsError("Prijava je bila neuspešna. Prosimo, poskusite znova.");
        });
    }

    const handleResetModal = (event) => {
        event.preventDefault();
        setResetModal(true);
    }

    const handleReset = () => {
        firebase.auth().sendPasswordResetEmail(resetEmail).then(function() {
            // Email sent.
            setResetModal(false);
        }).catch(function(error) {
            // An error happened.
        });
    }

    return (
        <>
            <Container className="management-container">
                <Col>
                    <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            Prijava
                        </div>
                        <Form role="form" onSubmit={(e) => handleSubmit(e)}>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="E-poštni naslov"
                                    type="email"
                                    autoComplete="new-email"
                                    value={email}
                                    onChange={handleEmail}
                                />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                    <i className="ni ni-lock-circle-open" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder="Geslo"
                                    type="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={handlePassword}
                                />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <FormText color="danger">
                                    {isError ? "Pri prijavi je prišlo do napake. Prosimo, poskusite znova." : ""}
                                </FormText>
                            </FormGroup>
                            <div className="text-center">
                                <Button className="my-4" color="danger" type="submit">
                                    Prijava
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Modal className="modal-dialog-centered modal-danger" contentClassName="bg-gradient-danger" isOpen={resetModal} toggle={() => { return null; }}>
                    <div className="modal-header">
                        <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => { setResetModal(false); }}>
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className="ni ni-bell-55 ni-3x" />
                            <h4 className="heading mt-4"></h4>
                            <p>
                                <small>Po oddani prošnji za ponastavitev gesla boste prejeli e-poštno sporočilo z nadaljnimi navodili.</small>
                            </p>
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                        <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="E-poštni naslov"
                                        type="email"
                                        autoComplete="new-email"
                                        value={resetEmail}
                                        onChange={(e) => handleResetEmail(e)}
                                    />
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button className="btn-white" color="default" type="button" onClick={handleReset}>
                            Ponastavi geslo
                        </Button>
                    </div>
                </Modal>
                <Row className="mt-3">
                    <Col xs="6">
                        <a href="#" className="link-text" onClick={(e) => handleResetModal(e)}>
                            <small>Ste pozabili geslo?</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </Container>
    </>
  );
};

export default Prijava;
