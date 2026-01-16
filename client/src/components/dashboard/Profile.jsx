import { Form, Button, Spinner, Toast } from "react-bootstrap";
import {
  changeField,
  setProfileFormFromUser,
} from "../../features/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUser } from "../../features/slices/userSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isUpdating, isUpdateSuccess, profileForm } = useSelector(
    (state) => state.user
  );

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ name, value }));
  };

  useEffect(() => {
    dispatch(setProfileFormFromUser());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(profileForm));
  };
  return (
    <>
      {isUpdating ? (
        <Spinner
          animation="border"
          variant="primary"
          className="position-absolute bottom-50 end-50"
          size="lg"
        />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={profileForm.name || ""}
              onChange={handleChange}
              name="name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={profileForm.email || ""}
              onChange={handleChange}
              name="email"
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Update
          </Button>
        </Form>
      )}
      {isUpdateSuccess && (
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
          <Toast.Body>User Profile Updated</Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default Profile;
