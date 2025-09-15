import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import apiClient from "../api/axiosConfig.js";
import ProductCardSkeleton from "./ProductCardSkeleton.jsx";

function FeaturedSection() {
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchProducts = async () => {
            try {
                const {data} = await apiClient.get('/product/featured');
                setProduct(data.slice(0,6));
            } catch (error) {
                console.error('Gagal Mengambil Data Produk:', error)
            } finally {
                setLoading(false)
            }
        };
        setTimeout(()=> {
            fetchProducts();
        }, 1500);
    },[])

    return (
        <section id="featured-sect" className="py-5 mt-5">
                <div className="row featured-section mt-5">
                    <div className="col-12 mb-4">
                        <h2 className="text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Featured</h2>
                        <p className="text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Our best-selling coffee and toast</p>
                    </div>
                </div>
                

                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {loading ? (
                            Array.from({length: 6}).map((_, index)=> (
                                <div className="col-6 col-md-6 col-lg-2" key={index}>
                                    <ProductCardSkeleton />
                                </div>
                            ))
                        ): (
                            <div className="row g-4 justify-content-center">
                                {products.map(product => (
                                    <div className="col-6 col-md-6 col-lg-2" key={product._id}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
        </section>
    );
}

export default FeaturedSection;