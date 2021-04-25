import { replace } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReply, addReview } from '../../redux/Review/Review.action';
import firebase from 'firebase/app';
import 'firebase/firestore';
const mapState = (state) => ({
    user: state.user.currentUser
})
function ReplyComment(props) {

    const { user } = useSelector(mapState);

    const [reply, setReply] = useState("");
    const dispatch = useDispatch();

    // console.log(props.id)
    // listReview.review[0].reply = [
    //     { user: "abc" , reply : "hay lam ban" ,
    
    //     user: "sa" , reply : "hay lam ban"}
    // ]
    console.log(props)

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            user: user,
            timeDate: new Date().toISOString(),
            reply: reply
        } 
        
        dispatch(
            addReply({
                reply: firebase.firestore.FieldValue.arrayUnion(data)
            },props.id )
        )
        setReply('')

    }


    return (

        <div>
            <div class="card card-inner">
                <div class="card-body">
                    <div class="row">

                        <div class="col-md-2">
                            <img src={user.imageUser} class="img img-rounded img-fluid" />
                        </div>
                        <div class="col-md-10">
                            <p><a href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{user.displayName}(Quản trị viên)</strong></a></p>
                            <form onSubmit={handleSubmit}>
                                <input value={reply} onChange={(e) => {
                                    setReply(e.target.value)
                                }} type="textarea" placeholder="Trả lời bình luận" />
                                <p>
                                    <a class="float-right btn btn-outline-primary ml-2"> <input type="submit" value="Trả lời"  /><i class="fa fa-reply"></i> </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyComment;