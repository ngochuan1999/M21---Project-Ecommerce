import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useScrollTop from '../../hook/useScrollTop';
import { registerUser, resetAllAuthForm, signUpUserStart } from '../../redux/User/user.action';
import './style.css';
import LoadingBox from '../../component/LoadingBox/LoadingBox';


const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    useErr: user.userErr,
    loading: user.loadingLogin

})

function Register() {

    useScrollTop();
    const { currentUser, useErr } = useSelector(mapState);
    const dispatch = useDispatch();


    useEffect(() => {
        if (currentUser) {

        }
    }, [currentUser])

    useEffect(() => {
        if (useErr) {

        }
    }, [useErr])


    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const [error_fullName, setError_fullName] = useState();
    const [error_email, setError_email] = useState("");
    const [error_password, setError_password] = useState("");
    const [error_confirmPassword, setError_confirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);





    const handleSubmit = async (e) => {
        e.preventDefault();



        displayName === "" ? setError_fullName("Vui lòng điền tên của bạn") : setError_fullName("")
        email === "" ? setError_email("Vui lòng điền email của bạn") : setError_email("")
        password === "" ? setError_password("Vui lòng mật khẩu của bạn") : setError_password("")
        password.length < 6 ? setError_password("Mật khẩu phải lớn hơn 6 ký tự") : setError_password("")
        confirmPassword === "" ? setError_confirmPassword("Vui lòng nhập lại mật khẩu của bạn") : setError_confirmPassword("")
        if (confirmPassword !== password) {
            setError_confirmPassword("Mật khẩu không trùng khớp ! Hãy nhập lại")
            return;
        }

        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }))
        reset();

    }

    const reset = () => {
        setEmail("");
        setPassword("");
        setDisplayName("");
        setConfirmPassword("")

    }

    return (
        <div className="login row m-5">
            <div className="col-lg m-5 pt-5">
                <h1 className="text-center">Tạo Tài Khoản</h1>
            </div>
            <div className="col-lg m-5">
                {isLoading === false ? "" : <LoadingBox />}
                <form onSubmit={handleSubmit} className="login">
                    <div className="form-group">
                        <label >Họ và Tên</label>
                        <input value={displayName} onChange={(e) => { setDisplayName(e.target.value) }} type="text" className="form-control" id="fullName" placeholder="Nhập Tên của bạn" />
                        <div className='err' value={error_fullName} >{error_fullName}</div>
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="email" placeholder="Email" />
                        <div className='err' value={error_email} >{error_email}</div>
                    </div>
                    <div className="form-group">
                        <label >Mật Khẩu</label>
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="password" placeholder="Mật Khẩu" />
                        <div className='err' value={error_password} >{error_password}</div>
                    </div>
                    <div className="form-group">
                        <label >Xác nhận Mật Khẩu</label>
                        <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" className="form-control" id="confirmPassword" placeholder="Xác Nhận Mật Khẩu" />
                        <div className='err' value={error_confirmPassword}>{error_confirmPassword}</div>
                    </div>

                    <input className="btn btn-success" type="submit" value="Đăng ký" />
                </form>
            </div>
        </div>
    )

}

export default Register;



