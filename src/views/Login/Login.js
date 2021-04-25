import './style.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, signInSuccess, signInWithGoogle, googleSignInStart } from '../../redux/User/user.action';
import useScrollTop from '../../hook/useScrollTop';
import swal from 'sweetalert';
import LoadingBox from '../../component/LoadingBox/LoadingBox';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    loading: user.loadingLogin
});


const validationSchema = Yup.object({
    email: Yup
        .string()
        .required('Vui lòng nhập tên'),
    email: Yup
        .string()
        .email('Định dạng email không hợp lệ')
        .required('Vui lòng nhập email'),
    password: Yup
        .string()
        .required('Vui lòng nhập mật khẩu'),


})
function Login(props) {
    useScrollTop();

    const history = useHistory()
    const { currentUser, loading } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);
    console.log(currentUser)


    useEffect(() => {
        if (currentUser) {

        }

    }, [currentUser])


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));
        history.goBack();

    }

    const loginWithGoogle = () => {
        dispatch(googleSignInStart())
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: ''

        },
        validationSchema,
        onSubmit: values => {
            dispatch(emailSignInStart(values));
            setIsLoading(true)
            formik.resetForm();
            // history.goBack()
        },
    });


    return (
        <div className="login row justify-content-center">

            <div className="col-lg-6 col-12">
                <h1 className="text-center">Đăng Nhập</h1>
            </div>

            <div className="col-lg-6 col-12 m-1">
                {isLoading === false ? "" : <LoadingBox />}
                <form className='login' onSubmit={formik.handleSubmit}>

                    <div className="form-group">
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

                    <div className="form-group">
                        <input className="form-control"
                            id='password'
                            type='password'
                            placeholder="Nhập mật khẩu"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='err'>{formik.errors.password}</div>) : null}
                        {/* <input type="password" value={password} onChange={(e) => setPassword(e.target.value) } className="form-control" id="exampleInputPassword1" placeholder="Mật khẩu" /> */}
                    </div >
                    <div className='d-flex'>
                        <button className="btn btn-secondary m-auto" type='submit' >
                            Đăng Nhập
                        </button>
                    </div>
                    <div className='d-flex'>
                        <Link className='ml-auto ' style={{ textDecoration: 'none' }} to='/forgot'>Quên mật khẩu</Link>
                    </div>


                    <div>
                        <Link to="/register"><button className='btn btn-outline-info mb-2'>Đăng Ký</button></Link>

                    </div>
                    <div>
                        <button onClick={loginWithGoogle} className="btn btn-outline-warning" href>Login With Google</button>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default Login;