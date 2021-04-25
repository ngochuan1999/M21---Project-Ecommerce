import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, deleteReview, fetchReviews } from '../../redux/Review/Review.action';
import { deleteReviewUser } from '../../redux/Review/Review.saga';
import ButtonComment from './ButtonComment';
import ReplyComment from './ReplyComment';
const mapState = state => ({
    listReview: state.reviewData.listReview
});

function ListReview(props) {

    const { listReview } = useSelector(mapState)
    const dispatch = useDispatch()
    const [reply, setReply] = useState(false)

    useEffect(() => {
        dispatch(
            fetchReviews(props.id)
        )

    }, [])



    const handleDelete = (review) => {
        dispatch(
            addReview({
                review: firebase.firestore.FieldValue.arrayUnion(review)
            }, props.id)
        )
    }


    const reviewProduct = () => {
        return (
            <div>
                {listReview.review.length == 0 ? "Sản phẩm chưa có đánh giá" : <>
                    {
                        listReview.review.map((e, index) => {
                            console.log(e.timeDate.split("T")[0])
                            console.log(e)
                            return (
                                <>
                                    <div className="card m-5">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <img src={e.user.imageUser} className="img img-rounded img-fluid rounded-circle w-50" />
                                                    <div>
                                                        <p className="text-secondary">{e.timeDate.split("T")[0]}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <p>
                                                        <a className="float-left"><strong>{e.user.displayName}</strong></a>
                                                        <p className="float-right">{e.start == "5" ? "Rất tốt" : e.start == "4" ? "  tốt" : e.start == "3" ? "Trung bình" : e.start == "2" ? "Tệ" : "Rất Tệ"}</p>
                                                        {/* <span className="float-right"><i className="text-warning fa fa-star" /></span>
                                                        <span className="float-right"><i className="text-warning fa fa-star" /></span>
                                                        <span className="float-right"><i className="text-warning fa fa-star" /></span>
                                                        <span className="float-right"><i className="text-warning fa fa-star" /></span> */}
                                                    </p>
                                                    <div className="clearfix" />
                                                    <p>{e.comment}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button className='btn btn-danger' onClick={() => {
                                                    // handleDelete(e)
                                                    dispatch(
                                                        addReview({
                                                            review: firebase.firestore.FieldValue.arrayRemove(e)
                                                        }, props.id)
                                                    )
                                                }} >Xoá</button>


                                                {/* <ButtonComment review={e} index={index} id={props.id} /> */}

                                            </div>



                                        </div>
                                    </div>
                                </>

                            )
                        })
                    }
                </>}

            </div>
        )
    }



    return (
        <>
            { listReview.review == undefined ? <>Sản phẩm chưa có đánh giá</> : reviewProduct()}

        </>


    );
}

export default ListReview;
