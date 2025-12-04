import CategoryCard from "../../components/CategoryCard";

async function getCategoryProducts(category) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function CategoryProductsPage({ params }) {
  const { category } = await params;
  const products = await getCategoryProducts(category);

  return (
    <div>
      <h1 style={{textAlign:"center"}}>{category}</h1>

      <div style={{display:"flex", flexWrap:"wrap", gap:"20px", padding:"10px"}}>
        {products.map((product) => (
          <CategoryCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
