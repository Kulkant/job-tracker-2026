import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStats } from "../../features/slices/allJobsSlice";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ChartContainer from "./ChartsContainer.jsx";

const Stats = () => {
  const { stats, monthlyApplications } = useSelector((state) => state.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card
            style={{
              width: "18rem",
              backgroundColor: "#d65db1",
              color: "white",
            }}
          >
            <Card.Body>
              <Card.Title>Jobs Applied</Card.Title>
              <Card.Text>
                <strong>Count:</strong> {stats.applied}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              width: "18rem",
              backgroundColor: "#845ec2",
              color: "white",
            }}
          >
            <Card.Body>
              <Card.Title>Interview Scheduled</Card.Title>
              <Card.Text>
                <strong>Count:</strong> {stats.interview}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              width: "18rem",
              backgroundColor: "#ff9671",
              color: "white",
            }}
            className="mt-4"
          >
            <Card.Body>
              <Card.Title>Jobs Offers</Card.Title>
              <Card.Text>
                <strong>Count:</strong> {stats.offer}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              width: "18rem",
              backgroundColor: "#ff6f91",
              color: "white",
            }}
            className="mt-4"
          >
            <Card.Body>
              <Card.Title>Jobs Declined</Card.Title>
              <Card.Text>
                <strong>Count:</strong> {stats.declined}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <h1>Monthly Applications</h1>
        <ChartContainer monthlyApplications={monthlyApplications} />
      </Row>
    </Container>
  );
};

export default Stats;
