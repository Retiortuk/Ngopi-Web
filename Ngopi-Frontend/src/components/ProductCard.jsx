import React from "react";

function ProductCard({product}) {
    return (
    <div className="card">
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <div className="price-cartAdd d-flex justify-content-between align-items-center">
            <p className="card-text price fw-bold">${product.price}</p>
            <a href="#" className="btn btn-dark">+</a>
            </div>
        </div>
    </div>
    );
}

export default ProductCard;