import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory ,editCategoryDetail } from '../../../redux/Category/category.action';
import swal from 'sweetalert';


const mapCategory = ({ category }) => ({
    category: category.category
})

const validationSchema = Yup.object({
    name: Yup
        .string()
        .required('Vui lòng nhập tên sản phẩm'),
  
    description: Yup
        .string()
        .required('Vui lòng nhập miêu tả sản phẩm'),
  
    imgCategory: Yup
        .string()
        .required('Vui lòng nhập địa chỉ liên kết ảnh chi tiết sản phẩm'),
  
})



function EditCategory(props) {
    const history = useHistory()
    const dispatch = useDispatch();
    const { category } = useSelector(mapCategory)
    let { id } = useParams();

    console.log(category)
    console.log(id)

    useEffect(() => {
        dispatch(fetchCategory(id))
    }, [])
    


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: category?.name,
            description: category?.description,
            imgCategory: category?.imgCategory,
        },
        validationSchema,
        onSubmit: values => {
            dispatch(
                editCategoryDetail({
                    name: values.name,
                    description: values.description,
                    imgCategory: values.imgCategory
                }, id)
            );
            formik.resetForm();
            swal("Cập nhật thành công!", "", "success");
            history.goBack()
        },
    });


    return (
        <div>
            <div className="m-2">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label for="name">Tên danh mục</label>
                        <input className="form-control"
                            id='name'
                            type='text'
                            placeholder="Nhập Tên danh mục"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>) : null}
                    </div>
                    <div className="form-group">
                        <label for="description">Miêu tả danh mục</label>
                        <input className="form-control"
                            id='description'
                            type='text'
                            placeholder="Miêu tả danh mục"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.description && formik.errors.description ? (
                            <div>{formik.errors.description}</div>) : null}
                    </div>

                    <div className="form-group">
                        <label for="imgCategory">Ảnh danh mục</label>
                        <input className="form-control"
                            id='imgCategory'
                            type='text'
                            placeholder="Hình Ảnh danh mục"
                            value={formik.values.imgCategory}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.imgCategory && formik.errors.imgCategory ? (
                            <div>{formik.errors.imgCategory}</div>) : null}
                    </div>


                    <button classNameName="btn btn-primary" type="submit">
                        Cập nhật danh mục
                </button>

                </form>
            </div>
        </div>
    );
}

export default EditCategory;