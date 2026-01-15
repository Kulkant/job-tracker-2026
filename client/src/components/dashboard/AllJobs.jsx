import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, deleteJob } from "../../features/slices/allJobsSlice.js";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import Job from "./Job.jsx";

const AllJobs = () => {
  const { isLoading, jobs, isDeleting } = useSelector((state) => state.allJobs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  const onDelete = (jobId) => {
    dispatch(deleteJob(jobId));
  };

  return (
    <Container className="mt-4">
      {isLoading || isDeleting ? (
        <Spinner
          animation="border"
          variant="primary"
          className="position-absolute bottom-50 end-50"
          size="lg"
        />
      ) : jobs.length === 0 ? (
        <h1>No jobs to display</h1>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col key={job._id} sm={12} md={6} lg={4}>
              <Job
                company={job.company}
                role={job.role}
                status={job.status}
                onDelete={() => onDelete(job._id)}
                job={job}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AllJobs;
