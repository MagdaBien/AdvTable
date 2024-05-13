import AdItem from "../../features/AdItem/AdItem";
import { Spinner, ListGroup } from "react-bootstrap";
import { API_URL } from "../../../config";
import { useState } from "react";
import { useParams } from "react-router";

const AdSearch = () => {
  const [status, setStatus] = useState(null);
  const adsList = [];
  const { searchPhrase } = useParams();

  const options = {
    method: "GET",
  };

  setStatus("loading");
  fetch(`${API_URL}/ads/search/${searchPhrase}`, options)
    .then((res) => {
      if (res.status === 200) {
        setStatus("success");
        // zwrot ogłoszen
      } else if (res.status === 400) {
        setStatus("clientError");
      } else {
        setStatus("serverError");
      }
    })
    .catch((err) => {
      setStatus("serverError");
    });

  return (
    <ListGroup>
      <h1>Ads found</h1>

      {status === "loading" && (
        <Spinner animation="border" role="status" className="block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {adsList.map((ad) => (
        <AdItem key={ad.id} {...ad}></AdItem>
      ))}
    </ListGroup>
  );
};

export default AdSearch;
