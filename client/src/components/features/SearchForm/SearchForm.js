import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { redirect } from "react-router-dom";

const SearchForm = () => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const actionHandler = (e) => {
    e.preventDefault();
    const pathSearch = "/search/" + searchPhrase;
    console.log("ścieżka: ", pathSearch);
    redirect(pathSearch);
  };

  return (
    <div>
      <Form onSubmit={actionHandler} className="col-12 col-sm-4 mx-auto">
        <Row>
          <Col>
            <Form.Control
              type="text"
              value={searchPhrase}
              onChange={(e) => setSearchPhrase(e.target.value)}
            />

            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchForm;
