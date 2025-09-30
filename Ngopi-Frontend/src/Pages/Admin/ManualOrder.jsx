import React, { useEffect } from "react";
import { useState } from "react";
import ProductCardSkeleton from "../../components/ProductCardSkeleton.jsx";
import ManualOrderCard from "../../components/Admin/ManualOrderCard.jsx";
import apiClient from "../../api/axiosConfig.js";

function ManualOrder() {

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProduct] = useState([]);

    useEffect(()=> {
        const fetchProducts = async() => {
            try {
                const {data} = await apiClient.get('/product');
                setProduct(data);
            } catch(error) {
                console.error("Erro Cannot Fetch Data:", error);
                toast.error('Cannot Fetch Data From DB!')
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    })



    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h2 mb-1">Manual Order</h1>
                    <p className="text-muted mb-4">What's User Wants?</p>
                </div>
            </div>  

            <div className="container-fluid px-0">
                <div className="row g-4 justify-content-center">
                    {isLoading ? (
                        Array.from({length: 12}).map((_, index)=> (
                            <div className="col-6 col-md-6 col-lg-2" key={index}>
                                <ProductCardSkeleton />
                            </div>
                        ))
                    ): (
                        <div className="row g-3 justify-content-center">
                            {products.map(product => (
                                <div className="col-6 col-md-6 col-lg-2" key={product._id}>
                                    <ManualOrderCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default ManualOrder;