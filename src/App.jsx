import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
        setError("");
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const showmore=()=>{
      setVisibleCount((prev)=>prev+10)
  }
  const visibleProducts = products.slice(0, visibleCount);
 

  return (
    <div className="main">
      <h1 className="shop-title">React Shop</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="product-con">
        {visibleProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="category">{product.category}</p>
            <p className="prize" >{product.price}</p>
          </div>
        ))}
      </div>
      {visibleCount < products.length && (
        <button onClick={showmore} className=" show-btn"> {" "} show more</button>
      )}
     
    </div>
     
  );
};

export default App;
