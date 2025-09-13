import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import apiClient from "../api/axiosConfig.js";
import toast from "react-hot-toast";

function MenuSection() {
    const [loading, setLoading] = useState(true);
    const [products, setProduct] = useState([]);

    useEffect(()=> {
        const fetchProducts = async () => {
            try {
                const {data} = await apiClient.get('/product');
                setProduct(data);
            } catch(error) {
                console.error('Tidak Dapat Mengambil data Produk:', error);
                toast.error("Canot Fetch Data From Database Product");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    },[])

    return(
        <section id="menu-sect" className="py-5 mt-5">
            <div className="row menu-section mt-5 pt-4">
                <div className="col-12 mb-4">
                <h2 className="text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Menu</h2>
                <p className="text-center" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>All of our menus</p>
                </div>
            </div>

            <div className="container">
                {loading ? (
                    <p className="text-center">Loading Menus.....</p>
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
        </section>
    );
}

export default MenuSection;