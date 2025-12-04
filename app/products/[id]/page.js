// 'use client';
// import { useParams } from 'next/navigation';

// export default function ProductClient() {
//   const { id } = useParams(); // ✅ gets id from URL
//   return <div>Product ID is {id}</div>;
// }


import ProductDetails from "../../components/ProductDetails";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { id } = await params; 

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();
  const product = await res.json();

  return <ProductDetails product={product} />;
}

