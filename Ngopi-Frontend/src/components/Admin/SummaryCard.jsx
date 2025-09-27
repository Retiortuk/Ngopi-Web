import React from "react";

function SummaryCard({title, value, isLoading}) {
    return (
        <div className="card border-1 shadow-sm h-100">
            <div className="card-body ">
                <h5 className="card-title text-muted mb-3">{title}</h5>
                {isLoading ? (
                    <span className="placeholder col-6 fs-2"></span>
                ): (
                    <p className="card-text  h4 fw-bold">{value}</p>
                )}
            </div>
        </div>
    )
};

export default SummaryCard;