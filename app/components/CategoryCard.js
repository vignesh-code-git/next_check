"use client";
import Link from "next/link";

export default function CategoryCard({ product }) {
  return (
    <div>
        <div style={{width:"300px",height:"300px", border:"1px solid #ccc", textAlign:"center", padding:"10px"}}>
            <img src={product.image} style={{objectFit:"contain"}} alt={product.title} height={100}/>
            <h2 >{product.title}</h2>
            <p >${product.price}</p>
            <Link href={`/products/${product.id}`}><b>View Details</b></Link>
        </div>
    </div>
  );
}   
