import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userCartStore } from "../../stores/userCartStore.js";
import ProductCardSkeleton from "../../components/ProductCardSkeleton.jsx";
import ManualOrderCard from "../../components/Admin/ManualOrderCard.jsx";
import apiClient from "../../api/axiosConfig.js";

const FloatingCartContent = ({totalItems, subtotal}) => (
        <div className="card shadow-lg rounded" style={{minWidth: '350px'}}>
            <div className="card-body p-">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="mb-0">
                            <i className="bi bi-cart-fill me-2"></i>
                            Orders ({totalItems} item)
                        </h6>
                        <p className="mb-0 small text-muted">
                            Subtotal: Rp{new Intl.NumberFormat('id-ID').format(subtotal)}
                        </p>
                    </div>
                    <Link to="/admin/admin-checkout" className="btn btn-dark d-flex align-items-center gap-2">
                        <span>Checkout</span>
                        <i className="bi bi-arrow-right-short"></i>
                    </Link>
                </div>

            </div>
        </div>

)
    


function ManualOrder() {

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProduct] = useState([]);

    const {cart} = userCartStore();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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

            {cart.length > 0 && ( 
                <>
                    <div className="d-md-none position-fixed bottom-0 start-50 translate-middle-x w-100 p-3" style={{ zIndex: 1030 }}>
                        <FloatingCartContent totalItems={totalItems} subtotal={subtotal} />
                    </div>
                    <div className="d-none d-md-block position-fixed bottom-0 end-0 m-3 m-md-4" style={{ zIndex: 1030 }}>
                        <FloatingCartContent totalItems={totalItems} subtotal={subtotal} />
                    </div>
                </>
            ) }


        </>
    )
}

export default ManualOrder;