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
  Container,
  FormText,
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

    const [isError, setIsError] = React.useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            let uid = userCredential.user.uid;

            sessionStorage.setItem("user_uid", uid);
            history.push({
                pathname: `/admin/pregled`,
            });
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;

            setIsError("Prijava je bila neuspešna. Prosimo, poskusite znova.");
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
                            {/*
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id=" customCheckLogin"
                                    type="checkbox"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor=" customCheckLogin"
                                >
                                    <span className="text-muted">Remember me</span>
                                </label>
                            </div>
                            */}
                            <div className="text-center">
                                <Button className="my-4" color="danger" type="submit">
                                    Prijava
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                {/*
                <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="text-light"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <a
                            className="text-light"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Create new account</small>
                        </a>
                    </Col>
                </Row>
                */}
            </Col>
        </Container>
    </>
  );
};

export default Prijava;
