import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCart,
  removeItem,
  incrementItem,
  decrementItem,
} from "../store/slices/cartSlice";

const Cart = () => {
  const { isCartOpen, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleCloseCart = (close) => {
    dispatch(toggleCart(close));
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementItem(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementItem(itemId));
  };

  // Disable body scroll when the cart is open
  useEffect(() => {
    const docBody = document.body;
    isCartOpen
      ? docBody.classList.add("overflow_hide")
      : docBody.classList.remove("overflow_hide");
  }, [isCartOpen]);

  const cartQuantity = cartItems.length;
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  return (
    <>
      {isCartOpen && (
        <div id="cart" className="cart">
          <div className="cart_content">
            <div className="cart_head">
              <h2>
                Cart <small>({cartQuantity})</small>
              </h2>
              <div
                title="Close"
                className="close_btn"
                onClick={() => handleCloseCart(false)}
              >
                <span>&times;</span>
              </div>
            </div>

            <div className="cart_body">
              {cartItems.length === 0 ? (
                <h2>Cart is empty</h2>
              ) : (
                cartItems.map((item) => {
                  const { id, img, title, price, quantity } = item;
                  const itemTotal = price * quantity;

                  return (
                    <div className="cart_items" key={id}>
                      <figure className="cart_items_img">
                        <img src={img} alt="product-img" />
                      </figure>

                      <div className="cart_items_info">
                        <h4>{title}</h4>
                        <h3 className="price">
                          ₹ {itemTotal.toLocaleString()}
                        </h3>
                      </div>

                      <div className="cart_items_quantity">
                        <button
                          type="button"
                          className="btn btn-decrement"
                          onClick={() => handleDecrement(id)}
                        >
                          -
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button
                          type="button"
                          className="btn btn-increment"
                          onClick={() => handleIncrement(id)}
                        >
                          +
                        </button>
                      </div>

                      <div
                        title="Remove Item"
                        className="cart_items_delete"
                        onClick={() => handleRemove(id)}
                      >
                        <span>&times;</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="cart_foot">
              <h3>
                <small>Total:</small>
                <b>₹ {cartTotal.toLocaleString()}</b>
              </h3>

              <button
                type="button"
                className="checkout_btn"
                disabled={cartQuantity === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
