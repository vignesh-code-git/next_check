import ProductList from './components/ProductList';

export default async function Home() {
  const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
  const products = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{textAlign:"center"}}>Products</h2>
      <ProductList products={products} />
    </div>
  );
}
