import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { addAdRequest } from "../../../redux/adsRedux";
import shortid from "shortid";

const AddAdForm = () => {
  const loggedUser = useSelector(getUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adData = {
    _id: shortid(),
    title: "",
    adContent: "",
    adPhoto: "",
    price: "",
    published: "",
    location: "",
  };

  const handleSubmit = (form) => {
    dispatch(
      addAdRequest({
        ...form,
        user: loggedUser.id,
        _id: adData._id,
      })
    );
    navigate("/");
  };

  return (
    <AdForm
      actionHandle={handleSubmit}
      buttonName="ADD AD"
      formData={adData}
    ></AdForm>
  );
};

export default AddAdForm;
