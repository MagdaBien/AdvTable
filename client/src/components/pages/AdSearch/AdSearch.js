import { useDispatch, useSelector } from "react-redux";
import {
  getAllFoundAds,
  getAllAds,
  isLoadingAds,
  isErrorAds,
} from "../../../redux/adsRedux";
import AdItem from "../../features/AdItem/AdItem";
import { Spinner, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router";

const Ads = () => {
  const dispatch = useDispatch();
  const { searchPhrase } = useParams();

  const adsList = useSelector(getAllAds);
  //console.log("thf: ", adsList);

  useEffect(() => {
    dispatch(getAllFoundAds(searchPhrase));
  }, [searchPhrase]);

  const isLoading = useSelector(isLoadingAds);
  const isError = useSelector(isErrorAds);
  //console.log(isLoading, isError);

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

  if (adsList.message) {
    return (
      <>
        <h1>All ads by phrase: {searchPhrase}</h1> <p>{adsList.message}</p>
      </>
    );
  }

  return (
    <ListGroup>
      <h1>All ads by phrase: {searchPhrase}</h1>
      {adsList.map((ad) => (
        <AdItem key={ad._id} {...ad}></AdItem>
      ))}
    </ListGroup>
  );
};

export default Ads;
