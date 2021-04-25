import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, fetchCategories } from '../../../redux/Category/category.action';
const mapState = ({ category }) => ({
    categories: category.categories
})
function ListCategory(props) {
    const { categories } = useSelector(mapState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            fetchCategories()
        )
    }, [])
    console.log(categories)


    const handleDeleteCategory = (documentID) => {
        dispatch(
            deleteCategory(documentID)
        )
    }
    return (
        <div>
            <div className="list_products">
                <Link to="/admin/addcategory" > <button className="btn btn-primary">Thêm danh mục</button></Link>

                <h2>Danh sách danh mục</h2>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên danh mục</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((cate, index) => {
                                    const { name, imgCategory, documentID } = cate
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{name}</td>
                                            <td ><button className="btn btn-danger" onClick={() => { handleDeleteCategory(documentID) }}>X</button></td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>



            </div>
        </div>
    );
}

export default ListCategory;