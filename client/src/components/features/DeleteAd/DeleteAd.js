import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import {
  removeAdRequest,
  isLoadingAds,
  isErrorAds,
} from "../../../redux/adsRedux";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const DeleteAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(removeAdRequest(id));
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

  navigate("/");
};
export default DeleteAd;
