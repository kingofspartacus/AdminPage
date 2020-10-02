import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Statistics from "./Statistics";
import LineChart from "./LineChart";
import Feed from "./Feed";
import Calendar from "./Calendar";
import PieChart from "./PieChart";
import Appointments from "./Appointments";
import Projects from "./Projects";
import BarChart from "./BarChart";

// const Default = () => (
//   <Container fluid className="p-0">

//     <Row>
//       <Col lg="6" xl="12" className="d-flex">
//         <Projects />
//       </Col>

//     </Row>
//   </Container>
// );


const Default = () => {
  const isLogin = localStorage.getItem("token")
  const [page, setPage] = useState(10)
  const [perPage, setPerPage] = useState(1)

  useEffect(() => {
    console.log(isLogin, "sda")
    if (!isLogin) {
      window.location.replace('/auth/sign-in')
    }
    return
  }, [])
  return (
    <Container fluid className="p-0">
      <Row>
        <Col lg="6" xl="12" className="d-flex">
          <Projects />
        </Col>
      </Row>
    </Container>
  )
}

export default Default;
