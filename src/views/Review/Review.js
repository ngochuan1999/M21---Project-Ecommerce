import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../../firebase/ultils';
import { addReview } from '../../redux/Review/Review.action';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Formik, useFormik } from 'formik';
import { FaStar } from 'react-icons/fa'
import './style.css'
import * as Yup from 'yup';



const validate = values => {

    const errors = {};

    if (!values.comment) {
        errors.comment = 'Vui lòng nhập đánh giá';
    }


    else if (values.comment.length < 10) {
        errors.comment = 'Bình luận quá ngắn , phải lớn lơn 10 kí tự';
    }



    return errors;
};
const mapState = (state) => ({
    user: state.user.currentUser
})
function Review(props) {

    const dispatch = useDispatch();
    const { user } = useSelector(mapState);
    const history = useHistory()

    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);

    console.log(props.product)


    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validate,
        onSubmit: values => {
            if (user) {
                const data = {
                    timeDate: new Date().toISOString(),
                    user: user,
                    start: rating.toString(),
                    comment: values.comment
                }
                dispatch(
                    addReview({
                        review: firebase.firestore.FieldValue.arrayUnion(data)
                    }, props.product.documentID)
                )

                formik.resetForm();
                setRating(null)
                swal("Cảm ơn bạn đã đóng góp ý kiến !");

            }
            else {
                history.push('/login')
                swal({
                    button: false,
                    text: "Đăng nhập để đánh giá sản phẩm",
                    timer: 1000
                });
            }
            // history.push('/');
        },
    });


    return (
        <div className="mt-5 pt-3">
            <div>
                <h3>Đánh giá sản phẩm</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group ">
                    <label htmlFor="start">Chọn mức độ hài lòng</label>
                    <div>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <>
                                    <label>
                                        <input type="radio"
                                            id='rating'
                                            name='rating'
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}

                                        ></input>
                                        <FaStar className='start' color={ratingValue <= (rating || hover) ? '#ffc107' : '#e4e5e9'} size={50}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)} />
                                    </label>
                                </>
                            )
                        })}

                    </div>
                </div>
                <div className="form-group w-50">
                    <label htmlFor="comment">Viết bình luận</label>
                    <textarea class="form-control" id="comment" rows={3}
                        name="comment"
                        placeholder="Đánh giá sản phẩm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.comment} />
                    {formik.touched.comment && formik.errors.comment ? (
                        <div className='err'>{formik.errors.comment}</div>) : null}
                </div>
                <button type="submit" className="btn btn-primary" disabled={!rating} >Đánh giá</button>

            </form>
            {/* <div>
                <h2 className="text-center pt-5">Đánh giá sản phẩm</h2>
            </div>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="start">Chọn mức độ hài lòng</label>
                    <select value={start} onChange={ (e) => setStart(e.target.value) }  className="form-control" id="start">
                        <option>Chọn</option>
                        <option value={1} >Rất tệ</option>
                        <option value={2}>Tệ</option>
                        <option value={3}>Trung bình</option>
                        <option value={4}>Tốt</option>
                        <option value={5}>Rất Tốt</option>
                    </select>
                </div>
              
                <div className="form-group">
                    <label htmlFor="comment">Để lại bình luận</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="form-control" id="comment" rows={3} defaultValue={""} />
                </div>
                <button class="btn btn-success btn-lg" type="submit">Đánh giá</button>
            </form> */}

        </div>
    );
}

export default Review;