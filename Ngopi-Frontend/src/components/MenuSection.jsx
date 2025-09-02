import React from "react";
import ProductCard from "./ProductCard.jsx";
import { menuProducts } from "../data/products.js";

function MenuSection() {
    return(
        <section id="menu-sect" className="py-1">
            <div className="row menu-section mt-5 pt-4">
                <div className="col-12 mb-4">
                <h2 className="text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Menu</h2>
                <p className="text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>All of our menus</p>
                </div>
            </div>

            <div className="card-container-menu">
                {menuProducts.map(product => (
                <div className="menu-card" key={product.id}>
                    <ProductCard product={product} />
                </div>
                ))}
            </div>
        </section>
    );
}

export default MenuSection;