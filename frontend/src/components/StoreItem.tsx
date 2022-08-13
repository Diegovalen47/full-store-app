import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { storeItem } from "../models/storeItem";

export function StoreItem({ id, name, price }: storeItem) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title
          className="
            d-flex
            justify-content-between
            align-items-baseline
            mb-4
          "
        >
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {/* Es esta parte es más facil usar un operador ternario */}
          {(() => {
            if (quantity === 0) {
              return (
                <Button
                  className="w-100"
                  onClick={() => increaseCartQuantity(id)}
                >
                  + Add to Cart
                </Button>
              );
            } else {
              return (
                <div
                  className="d-flex align-items-center flex-column"
                  style={{ gap: ".5rem" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ gap: ".5rem" }}
                  >
                    <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                    <div>
                      <span className="fs-3">{quantity} </span>
                      in cart
                    </div>
                    <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </Button>
                </div>
              );
            }
          })()}
        </div>
      </Card.Body>
    </Card>
  );
}
