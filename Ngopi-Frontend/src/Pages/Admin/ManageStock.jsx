import React, {useEffect, useState, useCallback} from "react";
import apiClient from "../../api/axiosConfig";
import ManageCard from "../../components/Admin/ManageCard.jsx";
import ProductCardSkeleton from "../../components/ProductCardSkeleton.jsx";
import PostProductModal from "../../components/Admin/PostProductModal.jsx";


function ManageStock () {
    const [products, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [postModal, setPostModal] = useState(false);

    const fetchProducts = useCallback(async() => {
        try {
            const {data} = await apiClient.get('/product');
            setProduct(data);
        } catch (error) {
            console.error('Tidak Dapat Mengambil data Produk:', error);
            toast.error("Canot Fetch Data From Database Product");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handlePost = () => {
        setPostModal(true);
    }


    useEffect(()=> {
        fetchProducts()
    },[fetchProducts]);

    return(
        <>  
        
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h2 mb-1">Manage Stock</h1>
                    <p className="text-muted mb-4">Start Manage Your Menu's Stock</p>
                </div>
            </div>    
            
            <button className="btn btn-outline-dark d-flex align-items-center gap-3 mb-4" onClick={handlePost}>
                <i className="bi bi-plus-circle"></i>
                <span>Add New Stock</span>
            </button>

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
                                    <ManageCard product={product} onUpdate={fetchProducts} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <PostProductModal
                show={postModal}
                onHide={() => setPostModal(false)}
                onUpdate={fetchProducts}
                />
        </>
    )
};

export default ManageStock;