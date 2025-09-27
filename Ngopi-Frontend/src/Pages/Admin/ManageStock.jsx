import React, {useEffect, useState} from "react";
import apiClient from "../../api/axiosConfig";
import ManageCard from "../../components/Admin/ManageCard.jsx";
import ProductCardSkeleton from "../../components/ProductCardSkeleton.jsx";


function ManageStock () {
    const [products, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        const fetchProducts = async() => {
            try {
                const {data} = await apiClient.get('/product');
                setProduct(data);
            } catch (error) {
                console.error('Tidak Dapat Mengambil data Produk:', error);
                toast.error("Canot Fetch Data From Database Product");
            } finally {
                setIsLoading(false);
            }
        };
        setTimeout(()=> {
            fetchProducts();
        }, 1000)
    });

    return(
        <>
            <h1 className="h2 mb-1">Manage Stock</h1>
            <p className="text-muted mb-4">Start Manage Your Menu's Stock</p>

            <div className="container">
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
                                    <ManageCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export default ManageStock;