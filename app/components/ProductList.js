"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Link from "next/link";

export default function ProductList({ products }) {
  const dispatch = useDispatch();

  return (
    <div
      style={{display: "flex",flexWrap: "wrap",justifyContent: "center",gap: "20px",padding: "20px",}}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{width: "220px",border: "1px solid #ddd",borderRadius: "10px",padding: "15px",textAlign: "center",}}>
          <Link href={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              style={{width: "150px",height: "150px",objectFit: "contain",marginBottom: "10px",}}/>
            <h3
              style={{fontSize: "16px",fontWeight: "600",minHeight: "45px",overflow: "hidden",}}>
              {product.title}
            </h3>
          </Link>

          <p style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0" }}>
            ${product.price}
          </p>

          <button
            onClick={() => dispatch(addToCart(product))}
            style={{padding:"5px"}}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
