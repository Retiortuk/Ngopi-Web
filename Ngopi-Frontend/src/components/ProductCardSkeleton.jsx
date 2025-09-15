import React from "react";

function ProductCardSkeleton() {
    return(
        
        <div className="card placeholder-glow" aria-hidden="true">
            <div className="placeholder card-img-top" style={{height: '180px'}}></div>
            <div className="card-body">
                <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-4"></span>
                    </p>
                    <a className="btn btn-dark disabled placeholder col-2"></a>
                </div>
            </div>
        </div>
    );
}

export default ProductCardSkeleton;

