import React, { useEffect, useState } from "react";
import MotionHoc from "./MotionHoc";
import "../styles/rows.css";
import { useCategory } from "./CategoryContext";
const CakeComponent = () => {
  const { selectedCategoryId } = useCategory();
  // console.log(selectedCategoryId);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (selectedCategoryId) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `https://getsu.liara.run/api/categories`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const products = await response.json();
          setProducts(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (products.length > 0 && selectedCategoryId) {
      // Find the category that matches the selectedCategoryId
      const selectedCategory = products.find(
        (category) => category._id === selectedCategoryId
      );

      // If the category is found, get its products
      if (selectedCategory && selectedCategory.products) {
        setFilteredProducts(selectedCategory.products);
      } else {
        setFilteredProducts([]); // No products found for the selected category
      }
    }
  }, [products, selectedCategoryId]);

  return (
    <>
      {/* Thay will get from api */}
      <h1>{products[2]?.name || "Loading..."}</h1>{" "}
      {/* Thay will get from api */}
      <div className="container-rows">
        <div className="name-product">
          {filteredProducts.map((item) => {
            return <p className="rows">{item.name}</p>;
          })}
        </div>
        <div className="price-product">
          {filteredProducts.map((item) => {
            return <p className="price-rows">{item.price}</p>;
          })}
        </div>
      </div>
    </>
  );
};

const Cake = MotionHoc(CakeComponent);

export default Cake;
