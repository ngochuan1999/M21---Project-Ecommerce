import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyComment from '../../Admin/ReviewAdmin/ReplyComment';
import { fetchReply, fetchReviews } from '../../redux/Review/Review.action';
import Start from '../Start/Start';
import CommentAdmin from './CommentAdmin';
import './style.css';
const mapState = state => ({
    listReview: state.reviewData.listReview,
    listReply: state.reviewData.listReply,
});

function Rate(props) {

    const { listReview, listReply } = useSelector(mapState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            fetchReviews(props.id)
        )

    }, [])

    useEffect(() => {
        dispatch(
            fetchReply(props.id)
        )

    }, [])

    console.log(props.id)
    console.log(listReview)


    const reviewProduct = () => {
        return (
            <div>
                {listReview.review.length == 0 ? "Sản phẩm chưa có đánh giá" : <>
                    {
                        listReview.review.map((e) => {
                            console.log(e.timeDate.split("T")[0])
                            console.log(e)

                            return (
                                <>
                                    <div className="card m-2">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <img src={e.user.photoUrl} className="img img-rounded img-fluid rounded-circle w-50" />
                                                    <div>
                                                        <p className="text-secondary">{e.timeDate.split("T")[0]}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <p>
                                                        <a className="float-left"><strong>{e.user.displayName}</strong></a>
                                                        {/* <p className="float-right">{e.start == "5" ? "Rất tốt" : e.start == "4" ? "  tốt" : e.start == "3" ? "Trung bình" : e.start == "2" ? "Tệ" : "Rất Tệ"}</p> */}
                                                        <p className="float-right">

                                                            <>
                                                                <h2>{(e.start >= 1 && e.start < 2) ?
                                                                    <>
                                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                                    </>
                                                                    : (e.start >= 2 && e.start < 3) ?
                                                                        <>
                                                                            <i class="fa fa-star" aria-hidden="true"></i>
                                                                            <i class="fa fa-star" aria-hidden="true"></i>
                                                                        </>
                                                                        : (e.start >= 3 && e.start < 4) ?
                                                                            <>
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </>
                                                                            : (e.start >= 4 && e.start < 5) ?
                                                                                <>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                </> :
                                                                                <>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                                                </>
                                                                }


                                                                </h2>
                                                            </>
                                                        </p>

                                                        {/* <span className="float-right"><i className="text-warning fa fa-star" /></span>
                                                        <span className="float-right"><i className="text-warning fa fa-star" /></span>
                                                        <span className="float-right"><i className="text-warning fa fa-star" /></span>
                                                        <span className="float-right"><i className="text-warning fa fa-star" /></span> */}
                                                    </p>
                                                    <div className="clearfix" />
                                                    <p>{e.comment}</p>

                                                </div>
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


    useEffect(() => {
        dispatch(fetchReviews(props.id))
    }, [])

    return (
        <>
            { listReview.review == undefined ? <>Sản phẩm chưa có đánh giá</> : reviewProduct()}

        </>


    );
}

export default Rate;