import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/pages/Home/Home";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import Ad from "./components/pages/Ad/Ad";
import Ads from "./components/pages/Ads/Ads";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import EditAdForm from "./components/features/EditAdForm/EditAdForm";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import Register from "./components/features/Register/Register";
import Login from "./components/features/Login/Login";
import Logout from "./components/features/Logout/Logout";
import AdSearch from "./components/pages/AdSearch/AdSearch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadLoggedUser } from "./redux/usersRedux";
import DeleteAd from "./components/features/DeleteAd/DeleteAd";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLoggedUser());
  }, []);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/ad/add" element={<AdAdd />} />
        <Route path="/ad/edit/:id" element={<EditAdForm />} />
        <Route path="/ad/delete/:id" element={<DeleteAd />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/logout" element={<Logout />} />
        <Route path="/search/:searchPhrase" element={<AdSearch />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
