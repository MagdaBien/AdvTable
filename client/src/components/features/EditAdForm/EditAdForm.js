import { useDispatch } from "react-redux";
import { editAdRequest } from "../../../redux/adsRedux";
import { useNavigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAdById } from "../../../redux/adsRedux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";

const EditAdForm = () => {
  const loggedUser = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUserId = loggedUser.id;

  const { id } = useParams();
  const ad2update = useSelector((state) => getAdById(state, id));
  if (ad2update === undefined || ad2update.user._id !== loggedUserId)
    return <Navigate to="/" />;

  const editData = {
    title: ad2update.title,
    adContent: ad2update.adContent,
    adPhoto: ad2update.adPhoto,
    price: ad2update.price,
    published: ad2update.published,
    location: ad2update.location,
    user: loggedUserId,
  };

  const handleSubmit = async (form) => {
    await dispatch(editAdRequest({ ...form, _id: id }));
    navigate("/");
  };

  return (
    <AdForm
      actionHandle={handleSubmit}
      buttonName="UPDATE"
      formData={editData}
    ></AdForm>
  );
};

export default EditAdForm;
