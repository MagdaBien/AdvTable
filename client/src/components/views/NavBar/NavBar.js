import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import SearchForm from "../../features/SearchForm/SearchForm";

const NavBar = () => {
  const user = useSelector(getUser);
  return (
    <Navbar
      variant="dark"
      bg="primary"
      data-bs-theme="light"
      className={styles.bgprimary}
    >
      <Container>
        <Navbar.Brand>Advertising Table</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/ad/add">
            Add ad
          </Nav.Link>
          <Nav.Link as={NavLink} to="/ads">
            All ads
          </Nav.Link>
          <Nav.Link as={NavLink} to="/auth/register">
            Rejestracja
          </Nav.Link>
          {user !== null && (
            <Nav.Link as={NavLink} to="/auth/logout">
              Logout
            </Nav.Link>
          )}
          {user === null && (
            <Nav.Link as={NavLink} to="/auth/login">
              Login
            </Nav.Link>
          )}

          <SearchForm />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
