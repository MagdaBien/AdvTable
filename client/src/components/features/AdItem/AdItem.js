import styles from "./AdItem.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";

const AdItem = (props) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <p>Ad number: {props._id}</p>
          <p>{props.title}</p>
          <p>{props.location}</p>
        </Col>
        <Col>foto</Col>
        <Col>
          <Nav.Link as={NavLink} to={"/ad/edit/" + props._id}>
            <span className={styles.bold}>EDIT </span>
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/ad/" + props._id}>
            <span className={styles.bold}>READ MORE</span>
          </Nav.Link>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default AdItem;
