import { useDispatch } from "react-redux";
import { editAdRequest } from "../../../redux/adsRedux";
import { useNavigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAdById } from "../../../redux/adsRedux";
import { Navigate } from "react-router-dom";

const EditAdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log("hello from EditTableForm");

  const { id } = useParams();
  const form = useSelector((state) => getAdById(state, id));
  if (form === undefined) return <Navigate to="/" />;

  const handleSubmit = (form) => {
    dispatch(editAdRequest(form));
    navigate("/");
  };

  return (
    <AdForm
      actionHandle={handleSubmit}
      buttonName="UPDATE"
      adData={form}
    ></AdForm>
  );
};

export default EditAdForm;
