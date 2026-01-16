import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { registerUser, loginUser, logout } from "../features/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMember, setIsMember] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = { name, email, password };

    if (!isMember) {
      dispatch(registerUser(currentUser));
      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    } else {
      dispatch(loginUser(currentUser));
      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    }
  };

  return isLoading ? (
    <Container>
      <Spinner
        animation="border"
        variant="primary"
        className="position-absolute bottom-50 end-50"
        size="lg"
      />
    </Container>
  ) : (
    <Container className="min-vh-100 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <h2 className="text-center mb-4 fw-bold">
            {isMember ? "Login to your account" : "Create an account"}
          </h2>

          <Form onSubmit={handleSubmit} id="form">
            {!isMember && (
              <Button
                onClick={() => {
                  dispatch(
                    loginUser({
                      email: "demo@example.com",
                      password: "ksharma9883",
                    })
                  );
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 200);
                }}
                className="btn btn-block btn-hipster mb-4"
              >
                Explore Demo App
              </Button>
            )}
            {!isMember && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 mb-3"
              disabled={isLoading}
            >
              {isMember ? "Login" : "Register"}
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                className="p-0 text-decoration-none"
                onClick={() => setIsMember(!isMember)}
              >
                {isMember
                  ? "Not a member? Register"
                  : "Already a member? Login"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
