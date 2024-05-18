import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const AdForm = ({ actionHandle, buttonName, formData }) => {
  //console.log("formdData: ", formData);

  const formatedPublishData = formData.published.substring(0, 10);
  const [title, setTitle] = useState(formData.title);
  const [adContent, setAdContent] = useState(formData.adContent);
  const [photo, setPhoto] = useState(formData.adPhoto);
  const [price, setPrice] = useState(formData.price);
  const [published, setPublished] = useState(formatedPublishData);
  const [location, setLocation] = useState(formData.location);
  const [user, setUser] = useState(formData.user);

  const actionHandler = (e) => {
    e.preventDefault();
    const data2database = {
      title,
      adContent,
      adPhoto: photo,
      price,
      published,
      location,
      user,
    };
    //console.log("data2database  ", data2database);
    actionHandle(data2database);
  };

  return (
    <div>
      <Form onSubmit={actionHandler} className="col-12 col-sm-4 mx-auto">
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title: </Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="adContent" className="mb-3">
          <Form.Label>Ad Content: </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={adContent}
            onChange={(e) => setAdContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="adPhoto" className="mb-3">
          <Form.Label>Photo: </Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price: </Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="published" className="mb-3">
          <Form.Label>Published: </Form.Label>
          <Form.Control
            type="date"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="location" className="mb-3">
          <Form.Label>Location: </Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
