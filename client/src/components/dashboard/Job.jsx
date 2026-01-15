import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setEditJob } from "../../features/slices/allJobsSlice";
import { useNavigate } from "react-router-dom";

const Job = ({ company, role, status, onDelete, job }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = () => {
    dispatch(setEditJob(job));
    navigate("/dashboard/add-job"); //navigate to the form page
  };
  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title>{company}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{role}</Card.Subtitle>
        <Card.Text>{status}</Card.Text>
        <Container>
          <Row>
            <Col>
              <Button variant="danger" onClick={onDelete}>
                Delete
              </Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={() => handleEdit()}>
                Update
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Job;
