import { Navbar, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/slices/userSlice.js";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-3">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand className="fs-4 text-capitalize fw-bold text-primary">
          {user?.name || "Guest"}
        </Navbar.Brand>

        {user && (
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
