import React from "react";
import { userCartStore } from "../stores/userCartStore.js";
import toast from "react-hot-toast";

function ProductCard({ product }) {
    const addToCart = userCartStore((state) => state.addToCart)

    const handleAddToCart = () => {
        addToCart(product)

        toast.success(`${product.title} Added To Cart`);
    }
    return (
    <div className="card">
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <div className="price-cartAdd d-flex justify-content-between align-items-center">
            <p className="card-text price fw-bold">${product.price}</p>
            <button onClick={handleAddToCart} className="btn btn-dark">+</button>
            </div>
        </div>
    </div>
    );
}

export default ProductCard;