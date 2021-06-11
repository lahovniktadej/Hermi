import Pregled from "views/Pregled.js";

import Nalogi from "views/Nalogi/Nalogi";
import Izpis from "views/Izpis/Izpis";
import Upravljanje from "views/Upravljanje/Upravljanje";
import Login from "views/Uporabnik/Login";

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
    hidden: true,
    component: Login,
    layout: "/auth",
  }
];
export default routes;
