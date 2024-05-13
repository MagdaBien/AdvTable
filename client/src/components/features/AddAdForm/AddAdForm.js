import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { addAdRequest } from "../../../redux/adsRedux";

const AddAdForm = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = {};

  const handleSubmit = (form) => {
    console.log("przed dispatch: ", {
      ...form,
      user: "6640b533bc7a0a3bd4b76c83",
    });
    dispatch(
      addAdRequest({
        ...form,
        user: "6640b533bc7a0a3bd4b76c83",
      })
    );
    navigate("/");
  };

  return (
    <AdForm
      actionHandle={handleSubmit}
      buttonName="ADD AD"
      formState={form}
    ></AdForm>
  );
};

export default AddAdForm;
