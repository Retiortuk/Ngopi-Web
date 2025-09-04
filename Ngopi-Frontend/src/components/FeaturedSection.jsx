import React from "react";
import ProductCard from "./ProductCard.jsx";
import { featuredProducts } from "../data/products.js";

function FeaturedSection() {
    return (
        <section id="featured-sect" className="py-5 mt-5">
                <div className="row featured-section mt-5">
                    <div className="col-12 mb-4">
                    <h2 className="text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Featured</h2>
                    <p className="text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Our best-selling coffee and toast</p>
                    </div>

                    <div className="card-container-feature">
                    {featuredProducts.map(product => (
                        <div className="featured-card" key={product.id}>
                        <ProductCard product={product} />
                        </div>
                    ))}
                    </div>
                </div>
        </section>
    );
}

export default FeaturedSection;