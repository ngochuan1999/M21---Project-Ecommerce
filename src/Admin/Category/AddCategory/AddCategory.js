import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { useFormik } from "formik";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { addCategory, fetchCategories } from '../../../redux/Category/category.action';

const validationSchema = Yup.object({
    name: Yup
        .string()
        .required('Vui lòng nhập tên danh mục'),

    description: Yup
        .string()
        .required('Vui lòng nhập miêu tả danh mục'),


    // imgCategory: Yup
    //     .string()
    //     .required('Vui lòng nhập địa chỉ liên kết ảnh danh mục'),

})

function AddCategory(props) {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(
            fetchCategories()
        );
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            description: '',
            // imgCategory: ''
        },
        validationSchema,
        onSubmit: values => {
            dispatch(
                addCategory({
                    name: values.name,
                    description: values.description,
                    // imgCategory: values.imgCategory
                })
            );
            formik.resetForm();
            swal("Thêm Dang mục thành công!", "", "success");
            history.goBack()
        },
    });

    return (
        <div className="m-2">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label for="name">Tên Danh mục</label>
                    <input className="form-control"
                        id='name'
                        type='text'
                        placeholder="Tên Danh mục"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>) : null}
                </div>


                <div className="form-group">
                    <label for="description">Miêu tả Danh mục</label>
                    <textarea className="form-control"
                        id='description'
                        type='text'
                        placeholder="Miêu tả Danh mục"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.description && formik.errors.description ? (
                        <div>{formik.errors.description}</div>) : null}
                </div>

                {/* <div className="form-group">
                    <label for="imgCategory">Hình ảnh danh mục</label>
                    <input className="form-control"
                        id='imgCategory'
                        type='text'
                        placeholder="Hình ảnh danh mục"
                        value={formik.values.thumbnail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.imgCategory && formik.errors.imgCategory ? (
                        <div>{formik.errors.imgCategory}</div>) : null}
                </div> */}

                <button className="btn btn-primary" type="submit">
                    Thêm Danh mục
              </button>

            </form>
        </div>



    );
}

export default AddCategory;