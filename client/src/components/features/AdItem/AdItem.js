import styles from "./AdItem.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import { IMGS_URL } from "../../../config";
import Button from "react-bootstrap/Button";

const AdItem = (props) => {
  //const formatedPublishData = props.published.substring(0, 10);

  return (
    <ListGroup.Item>
      <Row>
        <Col xs="auto">
          <div className={styles.photo}>
            <img className={styles.photo} src={IMGS_URL + props.adPhoto} />
          </div>
        </Col>
        <Col>
          <h3 className={styles.title}>{props.title}</h3>
          <h4> {props.price} zł</h4>
          <p>Location: {props.location}</p>
        </Col>
        <Col xs="auto">
          <Nav.Link
            as={NavLink}
            to={"/ad/" + props._id}
            className={styles.moreButton}
          >
            <Button variant="primary" className="mt-3">
              READ MORE
            </Button>
          </Nav.Link>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default AdItem;
