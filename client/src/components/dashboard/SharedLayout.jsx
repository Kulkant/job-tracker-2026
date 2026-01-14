import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "./dashboardLayouts/NavBar.jsx";
import BigSidebar from "./dashboardLayouts/BigSidebar.jsx";
import SmallSidebar from "./dashboardLayouts/SmallSidebar.jsx";
import { Outlet } from "react-router-dom";

const SharedLayout = ({ children }) => {
  return (
    <>
      <AppNavbar />

      <Container fluid>
        <Row>
          {/* Big sidebar for desktop */}
          <Col md={3} className="d-none d-md-block p-0">
            <BigSidebar />
          </Col>

          {/* Main content */}
          <Col xs={12} md={9} className="p-3">
            {/* Small sidebar for mobile */}
            <SmallSidebar />
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SharedLayout;
