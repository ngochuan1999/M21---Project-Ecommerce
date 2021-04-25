import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatter } from '../../../App';
import Search from '../../../component/Search/Search';
import useScrollTop from '../../../hook/useScrollTop';
import { deleteProduct, fetchProducts } from '../../../redux/Product/products.action';
import LoadMore from './../../../component/LoadMore/LoadMore'
import swal from 'sweetalert';
import SearchProductAdmin from '../../ComponentAdmin/SearchProductAdmin';
const mapState = ({ productsData }) => ({
    products: productsData.products
})
function ListProduct(props) {
    useScrollTop();
    const { products } = useSelector(mapState);
    const dispatch = useDispatch();
    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
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


    const hanleDelete = (documentID) => {
        dispatch(deleteProduct(documentID))
        swal("Xoá sản phẩm thành công!", "", "success");
    }
    console.log(typeof (data.price))
    return (
        <div className="list_products mt-2">
            <Link to="/admin/newproduct"><button className="btn btn-primary">Thêm mới sản phẩm</button> </Link>
            <SearchProductAdmin />
            <h2>Danh sách sản phẩm</h2>

            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Loại sản phẩm</th>
                            <th scope="col">Giá sản phẩm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                                const { name, description, category, thumbnail, price, documentID } = product
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className='w-25'><Link className='text-info card-text' style={{ textDecoration: 'none' }} to={`/admin/editproduct/${documentID}`} >{name}</Link> </td>
                                        <td className='w-25'> <img className="img-thumbnail w-25" src={thumbnail} /> </td>
                                        <td>{category}</td>
                                        <td>{formatter.format(price)}</td>
                                        <td ><button className="btn btn-danger" onClick={() => hanleDelete(documentID)}>X</button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            <div className='d-flex'>
                <div className='m-auto'>
                    {!isLastPage && (
                        <LoadMore {...configLoadMore} />
                    )}
                </div>

            </div>

        </div>
    );
}

export default ListProduct;


