import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/usersRedux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "DELETE",
    };

    fetch(`${API_URL}/auth/logout`, options).then((res) => {
      dispatch(logOut());
      navigate("/");
    });
  }, [dispatch]);
};

export default Logout;
