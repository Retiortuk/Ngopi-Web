import React from 'react';

const OrderCardItemSkeleton = () => (
    <>
        <div className="d-flex align-items-center py-2">
            
            <div className="placeholder rounded-3" style={{ width: '60px', height: '60px' }}></div>
            
            
            <div className="ms-3 flex-grow-1">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4 d-block mt-2"></span>
            </div>
        </div>
        <hr className="my-1" />
    </>
);


function OrderCardSkeleton() {
    return (
        <div className="card border-1 shadow-sm mb-4 placeholder-glow" aria-hidden="true">
            
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div>
                    <h6 className="mb-0 placeholder col-8"></h6>
                    <small className="placeholder col-6 d-block mt-2"></small>
                </div>
                <span className="placeholder col-3"></span>
            </div>

            
            <div className="card-body">
                <OrderCardItemSkeleton />
                <OrderCardItemSkeleton />
            </div>

            
            <div className="card-footer text-end">
                <p className="mb-0 placeholder col-4"></p>
            </div>
        </div>
    );
}

export default OrderCardSkeleton;
