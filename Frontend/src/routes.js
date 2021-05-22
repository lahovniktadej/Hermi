import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Delavci from "views/Delavci";
import Skrbniki from "views/Skrbniki";
import Vozila from "views/Vozila";
import Nalogi from "views/Nalogi"
import Analiza from "views/Analiza"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-red",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/nalogi",
    name: "Nalogi",
    icon: "fas fa-file-export text-red",
    component: Nalogi,
    layout: "/admin",
  },
  {
    path: "/delavci",
    name: "Delavci",
    icon: "fas fa-users text-red",
    component: Delavci,
    layout: "/admin",
  },
  {
    path: "/skrbniki",
    name: "Skrbniki",
    icon: "fas fa-users-cog text-red",
    component: Skrbniki,
    layout: "/admin",
  },
  {
    path: "/vozila",
    name: "Vozila",
    icon: "fas fa-car text-red",
    component: Vozila,
    layout: "/admin",
  },
  {
    path: "/analiza",
    name: "Analiza",
    icon: "fas fa-chart-line text-red",
    component: Analiza,
    layout: "/admin",
  },

  /*
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
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
