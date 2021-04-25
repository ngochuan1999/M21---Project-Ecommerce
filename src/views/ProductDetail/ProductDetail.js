import React, { Component, Suspense } from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import useScrollTop from '../../hook/useScrollTop';
import { addToCart } from '../../redux/Cart/cart.action';
import { fetchProductStart, setProduct } from '../../redux/Product/products.action';
import LazyLoad from 'react-lazyload';
import swal from 'sweetalert';
import Review from '../Review/Review';
import Rate from '../Rate/Rate';
import Start from '../Start/Start';
import { formatter } from '../../App';
import LoadingBox from '../../component/LoadingBox/LoadingBox';

const mapState = state => ({
    product: state.productsData.product,
    loading: state.productsData.loadingDetail
});


function ProductDetail({ match }) {
    useScrollTop();
    const history = useHistory()
    const dispatch = useDispatch();
    const { product, loading } = useSelector(mapState)
    let { id } = useParams();
    console.log(product)
    console.log('loading', loading)
    const src = [
        product.thumbnail,
        product.imgDetail,
        product.imgDetail2
    ];
    const [stt, setStt] = useState(0)
    useEffect(() => {
        dispatch(fetchProductStart(id))

    }, [product])

    const handleAddToCart = (product) => {
        if (!product) return;
        dispatch(addToCart(product));
        swal({
            button: false,
            text: "Sản phẩm đã được thêm vào giỏ hàng",
            icon: "success",
            timer: 1000
        });
    }
    const handletab = index => {
        setStt(index)
    }
    return (

        <>
            {loading === false ? <>  <div className="row px-1 mt-3">
                <div className="col-md-6 mb-4 mb-md-0">
                    <div id="mdb-lightbox-ui" />
                    <div className="mdb-lightbox">
                        <div className="row product-gallery mx-1">
                            <div className="col-12 mb-0">
                                <figure className="d-flex view overlay rounded z-depth-1 main-img">
                                    <a className='m-auto ' data-size="710x823">
                                        <img src={src[stt]} className="img-fluid w-50 h-50 z-depth-1 border" />
                                    </a>
                                </figure>

                            </div>
                            <div className="col-12">
                                <div className="row">
                                    {
                                        src.map((img, index) => {
                                            return (
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <img src={img} className="img-fluid border w-75 h-75 " onClick={() => { handletab(index) }} />

                                                        <div className="mask rgba-white-slight" />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h5 className="font-weight-bold text-info">{product.name}</h5>
                    <p className="mb-2 text-muted text-uppercase small">{product.category}</p>

                    <Start product={product} id={id} />
                    <p><span className="mr-1 "><strong className='text-warning'>   {formatter.format(product.price)}</strong></span></p>
                    <button className="btn btn-secondary btn_cart mr-3 mt-3 mb-3 w-100 p-2" onClick={() => { handleAddToCart(product) }}>THÊM VÀO GIỎ</button>
                    <strong>Mô tả</strong>
                    <div>
                        <p className="pt-1">{product.description}</p>
                    </div>


                    <hr />

                </div>
            </div>
                <Review product={product} />
                <Rate id={id} /> </> : <LoadingBox />}

        </>

    )

};



export default ProductDetail;