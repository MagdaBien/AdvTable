import { useDispatch, useSelector } from "react-redux";
import {
  loadAdsRequest,
  getAllAds,
  isLoadingAds,
  isErrorAds,
} from "../../../redux/adsRedux";
import AdItem from "../../features/AdItem/AdItem";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect } from "react";

const Ads = () => {
  const dispatch = useDispatch();

  const adsList = useSelector(getAllAds);
  //console.log("Tuuuuuuuuuu: ", adsList);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, []);

  const isLoading = useSelector(isLoadingAds);
  const isError = useSelector(isErrorAds);
  //console.log(isLoading, isError);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error ... {isError}</p>;
  }

  if (adsList.length === 0) {
    return <p>No data ...</p>;
  }

  return (
    <ListGroup>
      <h1>All Ads</h1>
      {adsList.map((ad) => (
        <AdItem key={ad._id} {...ad}></AdItem>
      ))}
    </ListGroup>
  );
};

export default Ads;
