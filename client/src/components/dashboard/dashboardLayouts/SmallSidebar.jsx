import { Nav, Offcanvas, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SmallSidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="d-md-none mb-2" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/dashboard" end onClick={handleClose}>
              Stats
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/dashboard/add-job"
              onClick={handleClose}
            >
              Add Job
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/dashboard/all-jobs"
              onClick={handleClose}
            >
              All Jobs
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/dashboard/profile"
              onClick={handleClose}
            >
              Profile
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SmallSidebar;
