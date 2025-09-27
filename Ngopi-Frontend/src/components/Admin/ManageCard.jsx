import React from "react";

function ManageCard({product}) {
    
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}${product.image}`;
    return (
        <div className="card h-100">
            <img src={imageUrl} className="card-img-top" alt={product.name} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <div className="price-cartAdd d-flex justify-content-between align-items-center mt-auto">
                    <p className="card-text price fw-bold mb-0">Rp{new Intl.NumberFormat('id-ID').format(product.price)}</p>
                    
                        <div className={`d-flex align-items-center gap-1 gap-sm-2`}>
                            <button className="btn btn-dark btn-sm">Edit</button>
                        </div>
                
                </div>
            </div>
        </div>
    )
}

export default ManageCard;