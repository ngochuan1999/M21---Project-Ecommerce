import React, { useState } from 'react';
import { auth, googleAuthProvider } from '../../firebase/ultils'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import useScrollTop from '../../hook/useScrollTop';
import { useFormik } from "formik";
import * as Yup from 'yup';
import swal from 'sweetalert';
const validationSchema = Yup.object({
    email: Yup
        .string()
        .email('Định dạng email không hợp lệ')
        .required('Vui lòng nhập email'),
})

const ForgotPass = (props) => {
    useScrollTop();
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async values => {
            const config = {
                url: 'http://localhost:3000/login'
            }
            try {
                await auth.sendPasswordResetEmail(values.email, config)
                    .then(() => {
                        swal("Hãy kiểm tra email để đặt mật khẩu mới!", "", "success");
                        history.push('/login')
                    })
                    .catch(() => {
                        const err = ['Không tìm thấy email, Xin thử lại!']
                        setErrors(err);
                    })
            } catch (err) {

            }
            formik.resetForm();
            // history.goBack()
        },
    });
    return (
        <div className="login row justify-content-center">

            <div className="col-lg-6 col-12 d-flex">
                <h1 className="text-center m-auto">Quên mật khẩu</h1>
            </div>

            <div className="col-lg-6 col-12 m-1">
                <form className='forgot_password' onSubmit={formik.handleSubmit}>

                    <div className="form-group">
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((e, index) => {
                                    return (
                                        <li key={index}>
                                            {e}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <input className="form-control"
                            id='email'
                            type='text'
                            placeholder="Nhập email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='err'>{formik.errors.email}</div>) : null}
                    </div>
                    <div className='d-flex'>
                        <button className="btn btn-primary m-auto" type='submit' >
                            Đặt lại mật khẩu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ForgotPass