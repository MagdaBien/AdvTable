import { Alert, AlertHeading, Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { API_URL } from "../../../config";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError, loginError
  const navigate = useNavigate();

  const actionHandler = (e) => {
    e.preventDefault();
    console.log(login, password, tel, avatar);

    const fd = new FormData();
    fd.append("login", login);
    fd.append("password", password);
    fd.append("tel", tel);
    fd.append("avatar", avatar);

    const options = {
      method: "POST",
      credentials: "include",
      body: fd,
    };

    setStatus("loading");
    fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus("success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
  };

  return (
    <div>
      <Form onSubmit={actionHandler} className="col-12 col-sm-4 mx-auto">
        <h1>Register now</h1>

        {status === "success" && (
          <>
            <Alert variant="success">
              <AlertHeading>Succes!</AlertHeading>
              <p>
                You have been successfully registered. You can now log in...
              </p>
            </Alert>
          </>
        )}

        {status === "serverError" && (
          <Alert variant="danger">
            <AlertHeading>Something went wrong ...</AlertHeading>
            <p>Try again</p>
          </Alert>
        )}

        {status === "clientError" && (
          <Alert variant="danger">
            <AlertHeading>Something went wrong ...</AlertHeading>
            <p>Fiil in all fields</p>
          </Alert>
        )}

        {status === "loginError" && (
          <Alert variant="warning">
            <AlertHeading>Something went wrong ...</AlertHeading>
            <p>Login is taken</p>
          </Alert>
        )}

        {status === "loading" && (
          <Spinner animation="border" role="status" className="block mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Login: </Form.Label>
          <Form.Control
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hasło: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone: </Form.Label>
          <Form.Control
            type="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Avatar: </Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          REGISTER
        </Button>
      </Form>
    </div>
  );
};

export default Register;
