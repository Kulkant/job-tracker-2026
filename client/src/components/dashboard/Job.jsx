import { Button, Card, Container, Row, Col, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setEditJob } from "../../features/slices/allJobsSlice";
import { useNavigate } from "react-router-dom";

const Job = ({
  company,
  role,
  status,
  onDelete,
  job, // This contains the full object including jobDescription, etc.
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(setEditJob(job));
    navigate("/dashboard/add-job");
  };

  // Safe destructuring with fallbacks
  const { location, salary, jobDescription } = job;

  return (
    <Card
      style={{ width: "18rem", marginBottom: "1rem" }}
      className="shadow-sm"
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title>{company}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{role}</Card.Subtitle>
          </div>
          {/* AI BADGE: Only shows if JD exists */}
          {jobDescription && (
            <Badge bg="success" style={{ fontSize: "0.7rem" }}>
              AI Ready 🤖
            </Badge>
          )}
        </div>

        <hr className="my-2" />

        <Card.Text className="mb-1">
          <strong>Status:</strong> {status}
        </Card.Text>
        <Card.Text className="mb-1">
          <strong>Location:</strong> {location || "Remote"}
        </Card.Text>
        <Card.Text className="mb-3">
          <strong>Salary:</strong> {salary || "Not Disclosed"}
        </Card.Text>

        <Container className="px-0">
          <Row>
            <Col>
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={onDelete}
              >
                Delete
              </Button>
            </Col>
            <Col>
              <Button variant="primary" className="w-100" onClick={handleEdit}>
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
