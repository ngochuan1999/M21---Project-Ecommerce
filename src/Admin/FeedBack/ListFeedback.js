import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { deleteMessage, fetchMessage } from '../../redux/Contact/contact.action';

const mapState = (state) => ({
    messages: state.message.messages
})
function ListFeedback(props) {

    const dispatch = useDispatch()
    const { messages } = useSelector(mapState)
    console.log(messages)
    useEffect(() => {
        dispatch(
            fetchMessage()
        )
    }, [])

    const handleDelete = (documentID) => {
        dispatch(deleteMessage(documentID))
        swal("Xoá feedback thành công!", "", "success");
    }
    return (
        <div>
            <h2>Danh sách phản hồi</h2>
            <div className="table-responsive">
                <table class="table table-light">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col">STT</th>
                            <th className='text-center' scope="col">Tên</th>
                            <th className='text-center' scope="col">Email</th>
                            <th className='text-center' scope="col">Chủ đề</th>
                            <th className='text-center' scope='col'>Nội dung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            messages?.map((mess, index) => {
                                const { name, email, subject, message, documentID } = mess
                                return (
                                    <tr key={index}>
                                        <th className='text-center' scope="row">{index + 1}</th>
                                        <td className='text-center'> {name} </td>
                                        <td className='text-center'>{email} </td>
                                        <td className='text-center'>{subject}</td>
                                        <td className='text-center'>{message}</td>
                                        <td ><button className='btn btn-danger' onClick={() => handleDelete(documentID)}>X</button></td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>



        </div>
    );
}

export default ListFeedback;


