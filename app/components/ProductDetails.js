"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ width: "200px", objectFit: "contain" }} />
      <p><b>Category : {product.category}</b></p>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
}
