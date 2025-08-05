import { useEffect, useState } from "react";

function Projects() {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  const URL = "http://localhost:3000/products";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="AppLayout">
      <h1>Projects</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
