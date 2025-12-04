// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState(null);

useEffect(() => {
  // Define a function to check the "username" cookie
  const checkCookie = () => {
    const cookieUsername = document.cookie
      .split("; ")                   // Split all cookies into an array like ["name=value", "foo=bar"]
      .find(row => row.startsWith("username=")) // Find the cookie that starts with "username="
      ?.split("=")[1] || "";         // If found, split by "=" and get the value; else default to empty string

    setUsername(cookieUsername);     // Update the React state with the cookie value
  };

  checkCookie(); // Run it once immediately to set initial username when the component mounts

  // Set up an interval to check the cookie every 500 milliseconds (0.5 sec)
  // This ensures that if the user logs in/out, the Navbar updates automatically
  const interval = setInterval(checkCookie, 500);

  // Cleanup function: clear the interval when the component unmounts
  // This prevents memory leaks and unnecessary checks when Navbar is no longer in the DOM
  return () => clearInterval(interval);

}, []); // Empty dependency array means this effect runs only once on mount




  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/categories/${encodeURIComponent(search.trim().toLowerCase())}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    // Clear cookies
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUsername(null);
    router.push("/login");
  };

  return (
    <nav>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          border: "1px solid #ccc",
          padding: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Link href="/">Home</Link>

        {/* Search */}
       <form onSubmit={handleSearch} style={{ display: "flex", gap: "5px" }}>
  <input
    type="text"
    list="categories"
    value={search}
    style={{ width: "300px", padding: "5px" }}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="electronics | jewelery | men's clothing | women's clothing"
  />
  <datalist id="categories">
    <option value="electronics" />
    <option value="jewelery" />
    <option value="men's clothing" />
    <option value="women's clothing" />
  </datalist>
  <button type="submit" style={{ padding: "5px" }}>
    Search
  </button>
</form>


        {/* Login / Logout */}
        {username ? (
          <>
            <span>Hi {username}!</span>
            <button onClick={handleLogout} style={{ padding: "5px" }}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}

        {/* Cart */}
        <Link href="/cart">Cart ({cartCount})</Link>
      </div>
    </nav>
  );
}
