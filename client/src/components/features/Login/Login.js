import { Alert, AlertHeading, Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/usersRedux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null); // null, loading, success, serverError, clientError
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const actionHandler = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    };

    setStatus("loading");
    fetch(`${API_URL}/auth/login`, options)
      .then(async (res) => {
        if (res.status === 200) {
          const user = await res.json();
          setStatus("success");
          dispatch(logIn(user));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (res.status === 400) {
          setStatus("clientError");
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
        <h1>Login now</h1>

        {status === "success" && (
          <Alert variant="success">
            <AlertHeading>Succes!</AlertHeading>
            <p>Zalogowano</p>
          </Alert>
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
            <p>Niepoprawne dane</p>
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

        <Button variant="primary" type="submit">
          Zaloguj
        </Button>
      </Form>
    </div>
  );
};

export default Login;
