import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import apiClient from '../../api/axiosConfig';
import toast from 'react-hot-toast';

function EditProductModal({show, onHide, product, onUpdate}) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price.toString());
            setIsFeatured(product.isFeatured);
        }
    }, [product]);

    const handleSave = async (e) => {
        e.preventDefault();

        const priceNumber =  Number(price);
        if(!priceNumber || priceNumber <= 0) {
            toast.error("Price Cannot be Emptied Or Rp.0");
            return; 
        }
        try {
            const updatedData = { name, price : priceNumber, isFeatured };
            await apiClient.put(`/product/update/${product._id}`, updatedData);
            
            toast.success(`'${name}' success updated!.`);
            onUpdate(); 
            onHide();
        } catch (error) {
            toast.error("Failed to Update.");
            console.error("Error updating product:", error);
        }
    };

    if(!product) return null;

    return(
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3" controlId="formProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProductPrice">
                        <Form.Label>Price (Rp)</Form.Label>
                        <Form.Control 
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProductFeatured">
                        <Form.Check 
                            type="switch"
                            label="Make Featured Product (Featured)"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="dark" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default EditProductModal;