import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, incrementItem, decrementItem } from "../store/slices/cartSlice";

const ProductsCard = (props) => {
  const { id, img, rating, title, price } = props;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const existingItem = cartItems.find(item => item.id === id);
  const initialQuantity = existingItem ? existingItem.quantity : 0;

  const [quantity, setQuantity] = useState(initialQuantity);

  const handleAddToCart = () => {
    const item = { ...props, quantity: 1 };
    dispatch(addItem(item));
    setQuantity(1);
  };

  const handleIncrement = () => {
    dispatch(incrementItem(id));
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(decrementItem(id));
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      dispatch(decrementItem(id));
      setQuantity(0);
    }
  };

  return (
    <div className="product_card">
      <figure>
        <img src={img} alt="item-img" className="product_img"/>
      </figure>
      <strong className="rating">{rating}</strong>
      <h4 className="title">{title}</h4>
      <h3 className="price">₹ {price.toLocaleString()}</h3>
      {quantity > 0 ? (
        <div className="quantity_controls">
          <button type="button" className="btn btn-decrement" onClick={handleDecrement}>-</button>
          <span className="quantity">{quantity}</span>
          <button type="button" className="btn btn-increment" onClick={handleIncrement}>+</button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-add"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductsCard;
