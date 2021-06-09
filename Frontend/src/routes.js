import Pregled from "views/Pregled.js";
/*
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
*/

import Nalogi from "views/Nalogi/Nalogi";
import Izpis from "views/Izpis";
import Upravljanje from "views/Upravljanje";
import Prijava from "views/Uporabnik/Prijava";

var routes = [
  {
    path: "/pregled",
    name: "Pregledna plošča",
    icon: "fas fa-desktop text-red",
    component: Pregled,
    layout: "/admin",
  },
  {
    path: "/nalogi",
    name: "Delovni nalogi",
    icon: "fas fa-file-export text-red",
    component: Nalogi,
    layout: "/admin",
  },
  {
    path: "/sifranti",
    name: "Šifranti",
    icon: "fas fa-user-cog text-red",
    component: Upravljanje,
    layout: "/admin",
  },
  {
    path: "/izpis",
    name: "Izpis",
    icon: "fas fa-chart-line text-red",
    component: Izpis,
    layout: "/admin",
  },
  {
    path: "/prijava",
    name: "Prijava",
    icon: "ni ni-key-25 text-info",
    component: Prijava,
    layout: "/admin",
  },
  /* Currently unused, potential set-up of login and profile stuff for later
    {
      path: "/user-profile",
      name: "User Profile",
      icon: "ni ni-single-02 text-yellow",
      component: Profile,
      layout: "/admin",
    },
    {
      path: "/login",
      name: "Login",
      icon: "ni ni-key-25 text-info",
      component: Login,
      layout: "/auth",
    },
    {
      path: "/register",
      name: "Register",
      icon: "ni ni-circle-08 text-pink",
      component: Register,
      layout: "/auth",
    },
  */
];
export default routes;
