import React, { useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import apiClient from '../../api/axiosConfig';
import toast from 'react-hot-toast';

function PostProductModal({show, onHide, onUpdate}) {
    // State For New Product
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isFeatured, setIsFeatured] = useState(false);
    // Loading State
    const [isUploading, setIsUploading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const resetForm = ()=> {
        setName('');
        setImageFile(null);
        setPrice('');
        setIsFeatured(false)
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if(!imageFile) {
            return toast.error('Upload The Image!');
        }

        const priceNumber =  Number(price);
        if(!name || !price || priceNumber <= 0) {
            toast.error("Price And Name Cannot be Emptied!");
            return; 
        }

        // Upload Picture
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', imageFile);
        let imagePath = '';
        try {
            const config = {
                headers: {'Content-Type': 'multipart/form-data'}
            };
            const {data} = await apiClient.post('/upload', formData, config);
            imagePath = data.image;
            toast.success('Successfully Upload Image!');
        } catch (error) {
            toast.error('Failed To Upload Image!');
            console.error('Error Message:', error);
            setIsUploading(false);
            return;
        } finally {
            setIsUploading(false)
        }

        // POST to Database
        setIsPosting(true)
        try {
            const postData = { 
                name, 
                price : priceNumber, 
                image: imagePath,
                isFeatured 
            };
            await apiClient.post(`/product/post`, postData);
            
            toast.success(`'${name}' success post new Product!.`);
            onUpdate(); 
            onHide();
            resetForm();
        } catch (error) {
            toast.error("Failed to Post.");
            console.error("Error posting product:", error);
        } finally {
            setIsPosting(false);
        }
    };


    return(
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Post New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Form onSubmit={handleSave}>

                    <Form.Group className="mb-3" controlId="formProductImage">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control 
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            required
                        />
                        {imageFile && (
                            <div className="mt-2">
                                <img 
                                    src={URL.createObjectURL(imageFile)} 
                                    alt="Preview" 
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                />
                            </div>
                        )}
                    </Form.Group>

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
                <Button variant="dark" onClick={handleSave} disabled={isUploading || isPosting}>
                    {isUploading ? 'Uploading...' : isPosting ? 'Posting...' : 'Post'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default PostProductModal;