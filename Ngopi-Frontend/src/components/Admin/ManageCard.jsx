import React, {useState} from "react";
import EditProductModal from "./EditProductModal.jsx";
import apiClient from "../../api/axiosConfig";
import toast from "react-hot-toast";
import  Dropdown  from 'react-bootstrap/Dropdown';
import styles from './ManageCard.module.css';

function ManageCard({product, onUpdate}) {

    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}${product.image}`;

    const [showEditModal, setShowEditModal] = useState(false);

    const handleStockToggle = async() => {
        const newAvailability = !product.isAvailable;
        try {
            await apiClient.put(`/product/update/${product._id}`, {isAvailable : newAvailability});
            toast.success(`${product.name} Successfully Update The Stock`);
            onUpdate();
        } catch (error) {
            toast.error('Failed To Update The Stock.');
            console.error('Error Message:', error);
        }
    };

    const handleDeleteStock = async() => {
        if(window.confirm(`Are You Sure You Want To Delete ${product.name}? This Can't Be Cancelled`)) {
            try {
                await apiClient.delete(`/product/delete/${product._id}`);
                toast.success('Sucessfully Delete The Item');
            } catch (error) {
                toast.error('Cannot Delete The Item');
                console.error('Error Message:', error);
            }
        }
    };

    const handleEditPrice = () => {
        setShowEditModal(true);
    };
    
    return (
        <>
        
            <div className={`card h-100 ${!product.isAvailable ? styles.outOfStock : ''}`}>
                {!product.isAvailable && <span className="badge bg-danger position-absolute top-0 start-0 m-2">Sold Out</span>}
                
                <img src={imageUrl} className="card-img-top" alt={product.name} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="price-cartAdd d-flex justify-content-between align-items-center mt-auto">
                        <p className="card-text price fw-bold mb-0">Rp{new Intl.NumberFormat('id-ID').format(product.price)}</p>
                        
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" size="sm" id={`dropdown-${product._id}`}>
                                Edit
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleEditPrice}>Edit Menu</Dropdown.Item>
                                <Dropdown.Item onClick={handleDeleteStock}>Delete Menu</Dropdown.Item>
                                <Dropdown.Item onClick={handleStockToggle}>
                                    {product.isAvailable ? 'Marked As Sold Out' : 'Mark As Available'}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <EditProductModal 
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                product={product}
                onUpdate={onUpdate}
            />
        </>

        // <div className="card h-100">
        //     <img src={imageUrl} className="card-img-top" alt={product.name} />
        //     <div className="card-body d-flex flex-column">
        //         <h5 className="card-title">{product.name}</h5>
        //         <div className="price-cartAdd d-flex justify-content-between align-items-center mt-auto">
        //             <p className="card-text price fw-bold mb-0">Rp{new Intl.NumberFormat('id-ID').format(product.price)}</p>
                    
        //                 <div className={`d-flex align-items-center gap-1 gap-sm-2`}>
        //                     <button className="btn btn-dark btn-sm">Edit</button>
        //                 </div>
                
        //         </div>
        //     </div>
        // </div>
    )
}

export default ManageCard;