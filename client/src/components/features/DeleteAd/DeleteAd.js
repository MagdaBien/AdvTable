import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { removeAdRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";

const DeleteAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(removeAdRequest(id));
    navigate("/");
  }, []);
};
export default DeleteAd;
