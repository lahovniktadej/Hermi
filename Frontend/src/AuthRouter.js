import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import firebase from "firebase/app";
import 'firebase/auth';
import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";
import config from "firebase_config";

import { useHistory } from "react-router-dom";

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

function AuthRouter() {
    const history = useHistory();

    return (
        <FirebaseAuthProvider firebase={firebase} {...config}>
            <FirebaseAuthConsumer>
                {
                    ({ isSignedIn, firebase }) => {
                        console.log(isSignedIn)
                        if (isSignedIn) {
                            history.push("/admin/pregled");
                        } else {
                            console.log("sdad")
                            history.push("/auth/prijava");
                        }
                    }
                }
            </FirebaseAuthConsumer>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Redirect from="/" to="/auth/prijava" />
            </Switch>
        </FirebaseAuthProvider>
    );
}

export default AuthRouter;