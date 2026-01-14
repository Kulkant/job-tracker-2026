import { Card } from "react-bootstrap";

const Job = ({ company, role, status }) => {
  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title>{company}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{role}</Card.Subtitle>
        <Card.Text>{status}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Job;
