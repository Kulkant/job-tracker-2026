import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const BigSidebar = () => {
  return (
    <div className="d-none d-md-block border-end vh-100 p-3">
      <Nav className="flex-column">
        <Nav.Link as={NavLink} to="/dashboard" end>
          Stats
        </Nav.Link>
        <Nav.Link as={NavLink} to="/dashboard/add-job">
          Add Job
        </Nav.Link>
        <Nav.Link as={NavLink} to="/dashboard/all-jobs">
          All Jobs
        </Nav.Link>
        <Nav.Link as={NavLink} to="/dashboard/profile">
          Profile
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default BigSidebar;
