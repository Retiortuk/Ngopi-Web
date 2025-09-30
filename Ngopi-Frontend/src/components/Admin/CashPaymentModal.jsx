import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const formatRupiah = (number) => new Intl.NumberFormat('id-ID').format(number);

function CashPaymentModal({show, onHide, totalAmount, onConfirm}) {
    const [cashReceived, setCashReceived] = useState('');

    const changeAmount = useMemo(()=> {
        const received = Number(cashReceived);
        if(isNaN(received) || received < totalAmount) {
            return 0;
        }
        return received - totalAmount;
    }, [cashReceived, totalAmount]);

    const isConfirmDisabled = Number(cashReceived) < totalAmount;

    useEffect(()=> {
        if(show) {
            setCashReceived('');
        }
    }, [show]);

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Cash Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mb-3">
                    <small className="text-muted d-block">Amount That Needs To Be Pay</small>
                    <p className="h2 fw-bold">Rp{formatRupiah(totalAmount)}</p>
                </div>
                <Form.Group className="mb-3" controlId="formCashReceived">
                    <Form.Label>Cash Receive</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="Example: 100000"
                        value={cashReceived}
                        onChange={(e) => setCashReceived(e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Change</p>
                    <p className="h4 fw-bold mb-0 text-success">Rp{formatRupiah(changeAmount)}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="dark" onClick={onConfirm} disabled={isConfirmDisabled}>
                    Confirm Payment
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CashPaymentModal;


