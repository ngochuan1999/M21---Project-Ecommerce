import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addUser, editUser, fetchUser, fetchUserId, setUser } from '../../../redux/User/user.action';
import { signUpUserStart } from '../../../redux/User/user.action'
import ModalAdd from './../../../component/Modal/Modal';
import { useFormik } from "formik";
import * as Yup from 'yup';
const mapState = ({ user }) => ({
    users: user.users
})

const validationSchema = Yup.object({
    displayName: Yup
        .string()
        .required('Vui lòng nhập tên'),
    email: Yup
        .string()
        .email('Định dạng email không hợp lệ')
        .required('Vui lòng nhập email'),
    password: Yup
        .string()
        .min(6, 'Mật khẩu phải lớn hơn 8 ký tự')
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password'), ''], 'Xác nhận mật khẩu chưa chính xác'),
    userRoles: Yup.string().required('Vui lòng chọn vai trò'),


})
function AddUser(props) {
    const dispatch = useDispatch();
    const { users } = useSelector(mapState);
    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    const formik = useFormik({
        initialValues: {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userRoles: '',
        },
        validationSchema,
        onSubmit: values => {
            dispatch(addUser(values));
            formik.resetForm();
            props.toggleModal()
        },
    });

    return (
        <div className="m-2">
            <ModalAdd toggleModal={props.toggleModal} show={props.showModalAdd}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input className="form-control"
                            id='displayName'
                            type='text'
                            placeholder="Nhập họ và tên"
                            value={formik.values.displayName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.displayName && formik.errors.displayName ? (
                            <div>{formik.errors.displayName}</div>) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Địa Chỉ Email</label>
                        <input className="form-control"
                            id='email'
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input className="form-control"
                            id='password'
                            type='password'
                            placeholder="Nhập mật khẩu"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input className="form-control"
                            id='confirmPassword'
                            type='password'
                            placeholder="Nhập xác nhận mật khẩu"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div>{formik.errors.confirmPassword}</div>) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="roles">Vai Trò</label>
                        <select
                            id='userRoles'
                            value={formik.values.userRoles}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} >
                            <option value=''>Chọn vai trò</option>
                            <option value='admin'>admin</option>
                            <option value='user'>user</option>
                        </select>
                        {formik.touched.userRoles && formik.errors.userRoles ? (
                            <div>{formik.errors.userRoles}</div>) : null}
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Thêm
              </button>

                </form>
            </ModalAdd>
        </div>
    );
}

export default AddUser;