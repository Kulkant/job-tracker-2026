import { useEffect, useState } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeField, clearValues } from "../../features/slices/jobSlice.js";
import { createJob } from "../../features/slices/jobSlice.js";
import { clearEditJob, updateJob } from "../../features/slices/allJobsSlice.js";

const AddJob = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // 1. SELECT THE NEW STATE VARIABLES
  const {
    company,
    role,
    status,
    jobDescription, // <--- NEW
    location, // <--- NEW
    salary, // <--- NEW
    statusOptions,
    isSuccess,
  } = useSelector((state) => state.job);

  const { isEditing, editJobData } = useSelector((state) => state.allJobs);

  useEffect(() => {
    if (isEditing && editJobData) {
      dispatch(changeField({ name: "company", value: editJobData.company }));
      dispatch(changeField({ name: "role", value: editJobData.role }));
      dispatch(changeField({ name: "status", value: editJobData.status }));

      // 2. POPULATE NEW FIELDS ON EDIT
      // We use || "" to prevent "uncontrolled input" errors if the field is missing in old data
      dispatch(
        changeField({
          name: "jobDescription",
          value: editJobData.jobDescription || "",
        }),
      );
      dispatch(
        changeField({
          name: "location",
          value: editJobData.location || "Remote",
        }),
      );
      dispatch(
        changeField({ name: "salary", value: editJobData.salary || "" }),
      );
    }
  }, [isEditing, editJobData, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      // Jab backend se success message aa jaye, tab form khali karo
      setTimeout(() => {
        dispatch(clearValues());
      }, 3000); // Toast dikhne ke baad clear karega
    }
  }, [isSuccess, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 3. SEND THE NEW PAYLOAD TO BACKEND
    const jobData = {
      company,
      role,
      status,
      jobDescription,
      location,
      salary,
    };

    if (isEditing && editJobData?._id) {
      dispatch(updateJob({ jobId: editJobData._id, jobData }));
      dispatch(clearEditJob());
    } else {
      dispatch(createJob(jobData));
    }
    setShow(true);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-white"
      >
        <h4 className="mb-4">
          {isEditing ? "Edit Job" : "Add New Application"}
        </h4>

        {/* ROW 1: Company & Role */}
        <div className="d-flex gap-3">
          <Form.Group className="mb-3 w-50">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={handleChange}
              name="company"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Frontend Engineer"
              value={role}
              onChange={handleChange}
              name="role"
            />
          </Form.Group>
        </div>

        {/* ROW 2: Status & Location */}
        <div className="d-flex gap-3">
          <Form.Group className="mb-3 w-50">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={handleChange} name="status">
              {statusOptions.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Remote / Bangalore"
              value={location}
              onChange={handleChange}
              name="location"
            />
          </Form.Group>
        </div>

        {/* ROW 3: Salary */}
        <Form.Group className="mb-3">
          <Form.Label>Salary Expectations</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. 12 LPA"
            value={salary}
            onChange={handleChange}
            name="salary"
          />
        </Form.Group>

        {/* CRITICAL UPGRADE: JOB DESCRIPTION */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold text-primary">
            Job Description (Paste for AI Analysis)
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Paste the entire Job Description here... We will use this to optimize your resume later."
            value={jobDescription}
            onChange={handleChange}
            name="jobDescription"
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="success" type="submit" size="lg">
            {isEditing ? "Update Job" : "Save Job to Tracker"}
          </Button>
        </div>
      </Form>

      {isSuccess && (
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className="mt-3 position-fixed top-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          <Toast.Header>
            <strong className="me-auto">Job Tracker</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>Job Saved Successfully!</Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default AddJob;
