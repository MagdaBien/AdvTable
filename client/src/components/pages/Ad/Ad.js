import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAdById } from "../../../redux/adsRedux";
import { IMGS_URL } from "../../../config";
import styles from "./Ad.module.scss";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { getUser } from "../../../redux/usersRedux";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useEffect } from "react";
import {
  loadAdsRequest,
  isLoadingAds,
  isErrorAds,
} from "../../../redux/adsRedux";
import PanelUserInfo from "../../views/PanelUserInfo/PanelUserInfo";

const Ad = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const ad = useSelector((state) => getAdById(state, id));
  const loggedUser = useSelector(getUser); // get extended data with user date

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, []);

  const isLoading = useSelector(isLoadingAds);
  const isError = useSelector(isErrorAds);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" className="block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return <p>Error ... {isError}</p>;
  }

  const adUser = { ...ad.user };
  console.log("user od ogłoszenia: ", loggedUser.id, adUser);

  let showEdit = false;
  if (loggedUser.id === adUser._id) {
    showEdit = true;
  }
  const formatedPublishData = ad.published.substring(0, 10);

  return (
    <div>
      <h1 className="mb-4">{ad.title}</h1>
      <Row>
        <Col xs="5">
          <h3>{ad.price} zł</h3>
          <p>
            Ad number:
            <br /> {ad._id}
            <br />
            <br />
            Published: {formatedPublishData}
            <br />
            Location: {ad.location}
          </p>

          {showEdit && (
            <>
              <Nav.Link
                as={NavLink}
                to={"/ad/edit/" + ad._id}
                className={styles.editButton}
              >
                <Button variant="warning">EDIT</Button>
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to={"/ad/delete/" + ad._id}
                className={styles.editButton}
              >
                <Button variant="danger">DELETE</Button>
              </Nav.Link>
            </>
          )}
        </Col>
        <Col xs="5">
          <div className={styles.photo}>
            <img className={styles.photo} src={IMGS_URL + ad.adPhoto} />
          </div>
        </Col>
        <Col xs="2">
          <PanelUserInfo adUser={adUser}></PanelUserInfo>
        </Col>
      </Row>
      <Row>
        <p className="mt-4">{ad.adContent}</p>
      </Row>
    </div>
  );
};

export default Ad;
