import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAdById } from "../../../redux/adsRedux";

const Ad = () => {
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  console.log(ad, id);

  return (
    <div>
      <h1>{ad.title}</h1>
      <p>Ad number {ad.id}</p>
      <p>{ad.adContent}</p>
    </div>
  );
};

export default Ad;
