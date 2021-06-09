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
import React, { useState } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  NavItem,
  NavLink,
  Nav,
  Input,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {

  const [activeNav, setActiveNav] = useState(1);
  const [dataMontazaMesec, setDataMontazaMesec] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [dataMontazaTeden, setDataMontazaTeden] = useState([0,0,0,0,0,0,0]);


  React.useEffect(() => {
    axios.get(`/api/delovniNalog`)
    .then((res) => {
        const nalogi = res.data;
        if(nalogi != null){
            let neto = [];
            nalogi.forEach((nalog)=> nalog.ekipe.forEach((ekipa)=>neto.push({montaza:ekipa.netoMontaza, datum:ekipa.datum})));
            handleMontazaTeden(neto);
            handleMontazaMesec(neto);
        }
    });
  },[]);
  React.useEffect(() => {
    setChartExample1Data(data1);
  },[dataMontazaMesec]);
  React.useEffect(() => {
    setChartExample1Data(data2);
  },[dataMontazaTeden]);

  const handleMontazaMesec = (neto) => {
    let now = new Date();
    let meseci =[];
    let dataLeto = neto.map((data)=>{if((now.getFullYear())===(new Date(data.datum).getFullYear()))return data;});
    for(let i = 1; i<=12; i++){
      let temp = dataLeto.map((data)=> {if((new Date(data.datum).getMonth()===i)) return data.montaza; else return 0;});
      temp = temp.reduce((a, b) => a + b, 0);
      meseci.push(temp);
    }
    setDataMontazaMesec(meseci);
}
const handleMontazaTeden = (neto) => {
  let now = new Date();
  let dnevi =[];
  let prviDanVTednu = new Date(now.setDate(now.getDate() - now.getDay())).toUTCString();
  let zadnjiDanVTednu = new Date(now.setDate(now.getDate() - now.getDay() + 7)).toUTCString();
  console.log(prviDanVTednu, zadnjiDanVTednu)
  let dataTeden = neto.filter((data)=>{if(new Date(prviDanVTednu) < new Date(data.datum) && new Date(data.datum) <= new Date(zadnjiDanVTednu))return data;});
  console.log(dataTeden)
  for(let i = 1; i<=7; i++){
    let danVTednu = new Date(now.setDate(now.getDate() - now.getDay() + i)).toUTCString()
    let temp = dataTeden.map((data)=> {if((new Date(data.datum).getDay()===new Date(danVTednu).getDay())) return data.montaza; else return 0;});
    temp = temp.reduce((a, b) => a + b, 0);
    dnevi.push(temp);
  }
  setDataMontazaTeden(dnevi);
}

  const data1 = () => {
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "Maj","Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
      datasets: [
        {
          label: "Performance",
          data: dataMontazaMesec
        },
      ],
    };
  };
  const data2 = () => {
    return {
      labels: ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"],
      datasets: [
        {
          label: "Performance",
          data: dataMontazaTeden,
        },
      ],
    };
  };
  const [chartExample1Data, setChartExample1Data] = useState(data1);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    if(index===1)
      setChartExample1Data(data1);
    else
      setChartExample1Data(data2);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="g-gradient-danger shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Analiza po montaži
                    </h6>
                    <h2 className="mb-0">Neto montaža</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Mesec</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Teden</span>
                          <span className="d-md-none">T</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1Data}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Analiza po mesecih
                    </h6>
                    <h2 className="mb-0">Število nalogov</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
        <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Napredek ekip</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Več
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Ime ekipe</th>
                    <th scope="col">Št. delavcev</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Ekipa 1</th>
                    <td>4</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Ekipa 2</th>
                    <td>2</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Ekipa 3</th>
                    <td>2</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" barClassName="bg-gradient-danger" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Ekipa 4</th>
                    <td>2</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Ekipa 5</th>
                    <td>4</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Pregled zaposlenih</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Več
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Zaposleni</th>
                    <th scope="col">Oddelane ure v mesecu</th>
                    <th scope="col">Oddelani objekti</th>
                    <th scope="col">Odstopanje od povprečja</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Delavec 1</th>
                    <td>150</td>
                    <td>7</td>
                    <td>
                      <i className="fas fa-arrow-down text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Delavec 2</th>
                    <td>180</td>
                    <td>9</td>
                    <td>
                      <i className="fas fa-arrow-up text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Delavec 3</th>
                    <td>160</td>
                    <td>4</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Delavec 4</th>
                    <td>180</td>
                    <td>6</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Delavec 5</th>
                    <td>160</td>
                    <td>8</td>
                    <td>
                      <i className="fas fa-arrow-up text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
};

export default Index;
