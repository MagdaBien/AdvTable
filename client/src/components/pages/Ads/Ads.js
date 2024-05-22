import { useDispatch, useSelector } from "react-redux";
import {
  loadAdsRequest,
  getAllAds,
  isLoadingAds,
  isErrorAds,
} from "../../../redux/adsRedux";
import AdItem from "../../features/AdItem/AdItem";
import { Spinner, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchForm from "../../features/SearchForm/SearchForm";

const Ads = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, []);

  const isLoading = useSelector(isLoadingAds);
  const isError = useSelector(isErrorAds);
  //console.log(isLoading, isError);
  const adsList = useSelector(getAllAds);

  if (isLoading || adsList.message) {
    return (
      <Spinner animation="border" role="status" className="block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return <p>Error ... {isError}</p>;
  }

  return (
    <>
      <Row>
        <Col className="mt-3 mb-2">
          <h1>All Ads</h1>
        </Col>
        <Col className="mt-4 mb-3 xs-auto">
          <SearchForm />
        </Col>
      </Row>
      <ListGroup>
        {adsList.map((ad) => (
          <AdItem key={ad._id} {...ad}></AdItem>
        ))}
      </ListGroup>
    </>
  );
};

export default Ads;
