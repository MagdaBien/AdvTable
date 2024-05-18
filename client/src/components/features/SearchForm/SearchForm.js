import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const navigate = useNavigate();

  const actionHandler = (e) => {
    e.preventDefault();
    if (searchPhrase) {
      const pathSearch = "/search/" + searchPhrase;
      setSearchPhrase("");
      navigate(pathSearch);
    }
  };

  return (
    <div>
      <Form inline="true" onSubmit={actionHandler}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search phrase"
              className=" mr-sm-2"
              value={searchPhrase}
              onChange={(e) => setSearchPhrase(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="outline-primary">
              SEARCH
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchForm;
