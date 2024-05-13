import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/usersRedux";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: "DELETE",
    };

    fetch(`${API_URL}/auth/logout`, options).then((res) => {
      dispatch(logOut());
    });
  }, [dispatch]);

  return null;
};

export default Logout;
