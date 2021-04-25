import React, { useEffect, useState } from 'react';
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { editUser, fetchUserId, setUser } from '../../redux/User/user.action';
import * as Yup from 'yup';
import useScrollTop from '../../hook/useScrollTop';
import { useFormik } from "formik";
import swal from 'sweetalert';
import axios from 'axios'
const mapState = state => ({
    user: state.user.currentUser,
    infoUser: state.user.user
});
const validationSchema = Yup.object({
    displayName: Yup
        .string()
        .required('Vui lòng nhập tên'),
    // email: Yup
    //     .string()
    //     .email('Định dạng email không hợp lệ')
    //     .required('Vui lòng nhập email'),


})
function InfoUser(props) {
    const history = useHistory();
    useScrollTop();
    const dispatch = useDispatch();
    const { user, infoUser } = useSelector(mapState);
    const [image, setImage] = useState('');
    useEffect(() => {
        dispatch(fetchUserId(user.id))
    }, [])

    console.log('user', user)
    const uploadImage = async (e) => {
        const files = e.target.files[0];
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'geekyimages')
        await axios.post('https://api.cloudinary.com/v1_1/ngochuan/image/upload', data)
            .then(
                res => setImage(res.data.secure_url)
            )
            .catch(err => console.log(err))

    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            displayName: user.displayName,
            email: user.email,
            userRoles: user.userRoles,
            photoUrl: image,
            id: user.id
        },
        validationSchema,
        onSubmit: values => {
            dispatch(editUser(values, user.id));
            formik.resetForm();
            swal("Cập nhật thành công!", "", "success");
            history.goBack()
        },
    });

    return (
        <div className="m-2 mt-5">
            <h1 className='text-center'>Thông tin tài khoản</h1>
            <form className='from_info_user' onSubmit={formik.handleSubmit}>
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
                    <input disabled='true' className="form-control"
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
                    <label htmlFor="avata">Avata:  <img className="img-thumbnail avata" src={user.photoUrl} alt='Không có ảnh' /></label><br></br>
                    <input type='file'
                        id='photoUrl'
                        name='file'
                        placeholder='upload image'
                        onChange={uploadImage}></input>
                    {/* <input className="form-control"
                        id='photoUrl'
                        type="text"
                        placeholder="Nhập địa chỉ liên kết ảnh"
                        value={formik.values.photoUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.photoUrl && formik.errors.photoUrl ? (
                        <div>{formik.errors.photoUrl}</div>) : null} */}

                </div>

                <div className='d-flex'>
                    <button disabled={!image} className="btn btn-primary m-auto" type="submit">
                        Lưu
              </button>
                </div>


            </form>
        </div>
    );
}

export default InfoUser;