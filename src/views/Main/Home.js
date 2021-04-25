import React, { Component, useEffect, Suspense, useState } from 'react';
import LazyLoad from 'react-lazyload';
import './style.css';
import {
    BrowserRouter as Router,
    Link,
    useHistory
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsHome } from '../../redux/Product/products.action';
import ProductCart from '../ProductCart/ProductCart';
import useScrollTop from '../../hook/useScrollTop';
import LoadMore from '../../component/LoadMore/LoadMore';
import LoadingBox from '../../component/LoadingBox/LoadingBox';
import emailjs from 'emailjs-com'
import swal from 'sweetalert';
const mapState = ({ productsData }) => ({
    productsHome: productsData.productsHome,
    products: productsData.products,
    loading: productsData.loading
})

const Load = React.lazy(() => import('../ProductCart/ProductCart'));
function Home() {
    useScrollTop();
    const dispatch = useDispatch();
    const history = useHistory()
    const { products, loading } = useSelector(mapState)
    const { data, queryDoc, isLastPage } = products;
    // const [loading,setLoading] = useState(false)
    const [email, setEmail] = useState('');
    console.log(products)
    useEffect(() => {
        // setLoading(true);
        dispatch(
            fetchProducts({})

        )
    }, [])

    const handleLoadMore = () => {
        dispatch(
            fetchProducts({
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        );
    };

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    };

    console.log(loading)
    function sendEmail(e) {
        e.preventDefault();
        let templateParams = {
            from_name: 'Routine Store',
            to_name: email,
        }
        try {
            emailjs.send('gmail', 'template_jf9zqfr', templateParams, 'user_Eo7PvRys51YuIzM4K5hRw')
            resetForm();
            swal("Kiếm tra mail để xem thông tin khuyến mãi!", "", "success")
        } catch (err) {
            swal(`${err}`, "", "error")
        }



    }
    const resetForm = () => {
        setEmail('');
    }

    return (
        <>{loading === true ? <LoadingBox /> : <main className="main">


            <div className="new-product m-5 ">
                <div>
                    <h3 className="text-center text-nowrap mt-5"><a href>SẢN PHẨM MỚI</a> </h3>
                </div>
                <div className="row d-flex justify-content-center">

                    {
                        (Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                            const { documentID, thumbnail, name, price } = product
                            const configProduct = {
                                ...product
                            }
                            return (
                                <ProductCart loading={loading} {...configProduct} />
                            )
                        })
                    }
                </div>
                <div className='d-flex'>
                    <div className='m-auto'>
                        {!isLastPage && (
                            <LoadMore {...configLoadMore} />
                        )}
                    </div>

                </div>
            </div>

            <div className="form_info row  m-3 p-5 border">
                <form onSubmit={sendEmail} className="input-group w-75 m-auto">
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className="form-control p-2x text-primary"
                        placeholder="Đăng kí để nhận thông tin khuyến mãi"
                        aria-label aria-describedby="basic-addon1" />
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="submit">Đăng ký</button>
                    </div>
                </form>
            </div>
        </main>
        }

        </>
    )

};

export default Home;