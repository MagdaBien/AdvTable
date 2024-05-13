import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import AddAdForm from "../../features/AddAdForm/AddAdForm";

const AdAdd = () => {
  const user = useSelector(getUser);
  console.log("zalogowany user: ", user);

  return (
    <div>
      <h1>Add ad</h1>
      {user !== null && <AddAdForm />}
      {user === null && <p>Musisz być zalogowany, żeby dodać ogłoszenie.</p>}
    </div>
  );
};

export default AdAdd;
