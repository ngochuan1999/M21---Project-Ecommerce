import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductsHome } from '../../redux/Product/products.action';
import './style.css';

const mapState = ({ productsData }) => ({
    products: productsData.productsHome
})
function SearchProductAdmin(props) {

    const dispatch = useDispatch()
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'vnd'
      })
    const { products } = useSelector(mapState);
    console.log(products)

    useEffect(() => {
        dispatch(
            fetchProductsHome()
        )
    },[])

    console.log(products)

    const [searchItem, setSearchItem] = useState("")
    return (
        <>
            <div className="search_box p-2 input-group">
                <input className="search_bar form-control" type="text" placeholder="Tìm kiếm sản phẩm" value={searchItem} onChange={(e) => { setSearchItem(e.target.value) }} />
                <span class="input-group-append">
                    <button class="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3" type="button">
                        <i class="fa fa-search"></i>
                    </button>
                </span>
            </div>
            <div className="box-admin">
                {products?.filter((item) => {
                    if (searchItem == "") {
                        return;
                    }
                    else if (item.name.toLowerCase().includes(searchItem.toLowerCase())) {
                        return item
                    }
                }).map((product, index) => {
                    console.log()
                    return (
                        <div className="search_bar border-top-0 border">
                            <Link style={{ textDecoration: 'none' }} to={`/admin/editproduct/${product.documentID}`}>
                                <div className="search row p-2  d-flex">
                                    <div className="search-main text-nowrap col-8">
                                        <div className="name font-weight-bold text-center "> {product.name}    </div>
                                        <div className="text-center "> {product.category}    </div>
                                        <div className="text-center ">{formatter.format(product.price)}</div>
                                    </div>
                                    <div className="col-3">
                                        <img className="img-thumbnail" src={product.thumbnail} alt="Thumbnail image" />
                                    </div>
                                </div>
                            </Link>



                        </div>
                    )
                })
                }
            </div>


        </>
    );
}

export default SearchProductAdmin;