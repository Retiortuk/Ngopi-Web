import React from "react";
import { userCartStore } from "../stores/userCartStore.js";
import styles from'./ProductCard.module.css';
import toast from "react-hot-toast";

function ProductCard({ product }) {
    const {cart, addToCart, removeFromCart} = userCartStore();
    const productInCart = cart.find(item => item._id === product._id);
    const quantityInCart = productInCart ? productInCart.quantity : 0;

    const handleAddToCart = () => {
        if(quantityInCart === 0) {
            toast.success(`${product.name} Added To Cart`, {
                style: {
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '16px',
                    borderRadius: '5px',
                    background: '#212529',
                    color: '#fff',
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#212529'
                    }
                },
            });
        }
        addToCart(product)
    };
    const handleRemoveFromCart = () => {
        if(quantityInCart === 1) {
            toast.error(`"${product.name}" Removed From Cart`, {
                style: {
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '16px',
                    borderRadius: '5px',
                    background: '#212529',
                    color: '#fff',
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#212529'
                    }
                },
            });
        }
        removeFromCart(product)
    }

    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}${product.image}`;

    return (
        <div className="card h-100">
            <img src={imageUrl} className="card-img-top" alt={product.name} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <div className="price-cartAdd d-flex justify-content-between align-items-center mt-auto">
                    <p className="card-text price fw-bold mb-0">Rp{new Intl.NumberFormat('id-ID').format(product.price)}</p>
                    {quantityInCart === 0 ? (
                        <button onClick={handleAddToCart} className="btn btn-dark btn-sm">+</button>
                    ) : (
                        <div className={`d-flex align-items-center gap-1 gap-sm-2 ${styles.quantityControls}`}>
                            <button className="btn btn-danger btn-sm" onClick={handleRemoveFromCart}>-</button>
                            <span className="fw-bold">{quantityInCart}</span>
                            <button className="btn btn-dark btn-sm" onClick={handleAddToCart}>+</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;