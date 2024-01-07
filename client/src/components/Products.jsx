// import styled from "styled-components";
// import { popularProducts } from "../data";
// import Product from "./Product";
// import { useEffect, useState } from "react";
// import axios from "axios";
// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

// const Products = ({ cat, filters, sort }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get(
//           cat
//             ? `http://localhost:5000/api/product/?category=${cat}`
//             : `http://localhost/5000/api/product/`
//         );
//         const data = await response.data;
//         setProducts(data);
//       } catch (err) {}
//     };
//     getData();
//   }, [cat]);

//   useEffect(() => {
//     cat &&
//       setFilteredProducts(
//         products.filter((item) =>
//           Object.entries(filters).every(([key, value]) => {
//             item[key].includes(value);
//           })
//         )
//       );
//   }, [products, cat, filters]);

//   useEffect(() => {
//     if (sort === "newest") {
//       setFilteredProducts((prev) =>
//         [...prev].sort((a, b) => a.createdAt - b.createdAt)
//       );
//     } else if (sort === "asc") {
//       setFilteredProducts((prev) =>
//         [...prev].sort((a, b) => a.price - b.price)
//       );
//     } else {
//       setFilteredProducts((prev) =>
//         [...prev].sort((a, b) => b.price - a.price)
//       );
//     }
//   }, [sort]);
//   return (
//     <Container>
//       {cat
//         ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
//         : products
//             .slice(0, 8)
//             .map((item) => <Product item={item} key={item.id} />)}
//     </Container>
//   );
// };

// export default Products;

import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          cat
            ? `http://localhost:5000/api/product/?category=${cat}`
            : `http://localhost:5000/api/product/`
        );
        const data = await response.data;
        setProducts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.createdAt - a.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
