"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart, // <-- make sure this is imported
} from "../redux/cartSlice";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div style={{ padding: "2rem" }} >
      <h2>Your Cart</h2>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            
            marginBottom: "1rem",
            border:"1px solid #ccc",
            padding:"10px"
          }}
        >
          <div>
            <img src={item.image} alt={item.title} style={{width: "150px",height: "150px",objectFit: "contain",marginBottom: "10px",}}/>
            
            <div style={{ marginTop: "0.5rem" }}>
              <p>{item.title} - ${item.price}</p>
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                }
                disabled={item.quantity <= 1}
                style={{
                  opacity: item.quantity <= 1 ? 0.5 : 1,
                  cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                }}
              >
                -
              </button>

              <span style={{ margin: "0 0.5rem" }}>{item.quantity}</span>

              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                }
              >
                +
              </button>
              <button style={{marginLeft:"10px"}} onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
            
          </div>

          
        </div>
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>

      <button
        onClick={() => dispatch(clearCart())}
        style={{
          padding: "0.5rem 1rem",
          marginTop: "1rem",
          cursor: "pointer"
        }}
      >
        Clear Cart
      </button>
    </div>
  );
}
