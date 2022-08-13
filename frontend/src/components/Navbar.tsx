import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  
  // Este es un ejemplo de como el componenete NavBar
  // que es hijo de ShoppinfCartProvider
  // utiliza cosas definidas en el context
  // por ellos esto se comparte en los componente
  // de forma global
  const { openCart, cartQuantity } = useShoppingCart()

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            style={{
              width: "3rem",
              height: "3rem",
              position: "relative"
            }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
          >
            <i className="bi bi-cart"></i>
            <div
              className="
                rounded-circle
                bg-danger
                d-flex
                justify-content-center
                align-items-center
              "
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
}
