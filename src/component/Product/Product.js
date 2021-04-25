import React from 'react';
import { Link } from 'react-router-dom';
const Product = ({ thumbnail, name, price }) => {
    if (!thumbnail || !name || typeof price === 'undefined') return null;
    return (
        <div className="col-md-3 col-sm-4">
            <Link to=''> <img src={thumbnail} className="card-img-top" alt={thumbnail} /></Link>
            <div className="card-body px-2 pb-2 pt-1">
                <div className="d-flex justify-content-between">
                    <div>
                        <p className="h4 text-primary">{price} Đ</p>
                    </div>
                    <div>
                        <a href="#" className="text-secondary lead" data-toggle="tooltip" data-placement="left" title="Compare">
                            <i className="fa fa-line-chart" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <p className="text-warning d-flex align-items-center mb-2">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                </p>
                <p className="mb-0">
                    <strong>
                        <a href="#" className="text-secondary">{name}</a>
                    </strong>
                </p>
                <p className="mb-1">
                    <small>
                        <a href="#" className="text-secondary">Brands</a>
                    </small>
                </p>
                <div className="d-flex mb-3 justify-content-between">
                    <div>
                        <p className="mb-0 small"><b>UPC: </b> 2310010</p>
                        <p className="mb-0 small"><b>PART#: </b> 2121</p>
                        <p className="mb-0 small"><b>MPN#: </b> mpn22651</p>
                    </div>
                    <div className="text-right">
                        <p className="mb-0 small"><b>Free Shipping</b></p>
                        <p className="mb-0 small"><b>MSRP: </b> $119.99</p>
                        <p className="mb-0 small"><b>REG: </b> $19.99</p>
                        <p className="mb-0 small text-primary">
                            <span className="font-weight-bold">Save</span> $20.00 (16%)
                </p>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="col px-0">
                        <button className="btn btn-outline-primary btn-block">
                            Add To Cart <span></span>
                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Product