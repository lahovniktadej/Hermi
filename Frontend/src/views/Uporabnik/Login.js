import React from "react";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Modal
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

const Login = () => {
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
        firebase.auth().sendPasswordResetEmail(resetEmail).then(function () {
            // Email sent.
            setResetModal(false);
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent">
                    <div className="text-muted text-center mt-2">
                        <small>Prijava</small>
                    </div>
                </CardHeader>
                <CardBody className="">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Email" type="email" autoComplete="new-email" onChange={handleEmail} />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Geslo" type="password" autoComplete="new-password" onChange={handlePassword} />
                            </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                            <Button className="my-4" color="danger" type="submit">Prijava</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            <Modal className="modal-dialog-centered" isOpen={resetModal} toggle={() => setResetModal(false)}>
                <div className="modal-header">
                    <Button className="close" color="" onClick={() => setResetModal(false)}>
                        <i class="fas fa-times"></i>
                    </Button>
                </div>
                <div className="modal-body">
                    <div className="text-center">
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
                    <Button color="danger" type="button" onClick={handleReset}>
                        Ponastavi geslo
                    </Button>
                </div>
            </Modal>
            <Row className="mt-3">
                <Col className="text-center">
                    <a className="text-dark" onClick={handleResetModal}>
                        <small>Ste pozabili geslo?</small>
                    </a>
                </Col>
            </Row>
        </Col>
    );
};

export default Login;
