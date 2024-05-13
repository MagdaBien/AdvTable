import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const AdForm = ({ actionHandle, buttonName, adData }) => {
  const [form, setForm] = useState({
    ...adData,
  });
  const [photo, setPhoto] = useState(null);

  console.log("form: ", form.adPhoto);

  const updateFields = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const actionHandler = (e) => {
    e.preventDefault();
    actionHandle({ ...form, adPhoto: photo });
  };

  return (
    <div>
      <Form onSubmit={actionHandler} className="col-12 col-sm-4 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Title: </Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={form.title}
            onChange={updateFields}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ad Content: </Form.Label>
          <Form.Control
            type="text"
            id="adContent"
            value={form.adContent}
            onChange={updateFields}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Photo: </Form.Label>
          <Form.Control
            type="file"
            id="adPhoto"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price: </Form.Label>
          <Form.Control
            type="number"
            id="price"
            value={form.price}
            onChange={updateFields}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Published: </Form.Label>
          <Form.Control
            type="data"
            id="published"
            value={form.published}
            onChange={updateFields}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location: </Form.Label>
          <Form.Control
            type="text"
            id="location"
            value={form.location}
            onChange={updateFields}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {buttonName}
        </Button>
      </Form>
    </div>
  );
};

export default AdForm;
