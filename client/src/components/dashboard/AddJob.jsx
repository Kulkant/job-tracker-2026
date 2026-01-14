import { useState } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeField, clearValues } from "../../features/slices/jobSlice.js";
import { createJob } from "../../features/slices/jobSlice.js";
const AddJob = () => {
  const dispatch = useDispatch();
  const { company, role, status, statusOptions, isSuccess } = useSelector(
    (state) => state.job
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ name, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ company, role, status });
    const jobData = { company, role, status };
    dispatch(createJob(jobData));
    dispatch(clearValues());
    setShow(true);
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company"
            value={company}
            onChange={handleChange}
            name="company"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Role"
            value={role}
            onChange={handleChange}
            name="role"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={status}
            onChange={handleChange}
            name="status"
          >
            {statusOptions.map((s) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          Add Job
        </Button>
      </Form>
      {isSuccess && (
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className="mt-3"
        >
          <Toast.Header>
            <strong className="me-auto">Job Tracker</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>Job Added</Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default AddJob;
