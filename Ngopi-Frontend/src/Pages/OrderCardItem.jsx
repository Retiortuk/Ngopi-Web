import React from "react"
import noteStyles from "./CheckOutItem.module.css";

function OrderCardItem({item}) {
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}${item.image}`;
    const hasNote = item.note && item.note.trim() !== '';
    return(
            <>
                <div className="d-flex align-items-center py-2">
                    <img src={imageUrl} className="img-fluid rounded-3" alt={item.name} style={{ width: '60px' }} />

                    <div className="ms-3 flex-grow-1">
                        <h6 className="mb-0">{item.name}</h6>
                        <small className="text-muted">
                            {item.quantity} x Rp{new Intl.NumberFormat('id-ID').format(item.price)}
                        </small>
                    </div>
                </div>
                {hasNote && (
                    <div className="ps-2 pt-1">
                        <p className={`small fst-italic text-muted mb-1 ${noteStyles.noteText}`}>
                            <strong>Note:</strong> {item.note}
                        </p>
                    </div>
                )}
                <hr />

            </>
    
    )
}

export default OrderCardItem;