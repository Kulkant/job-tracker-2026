import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-wrapper">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={8} lg={6} className="text-center">
            <h1 className="mb-3 fw-bold">Job Tracking App</h1>
            <p className="text-muted mb-4">
              Keep track of your job applications in one simple dashboard.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Landing;
