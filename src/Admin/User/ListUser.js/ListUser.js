import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUser } from '../../../redux/User/user.action'
import EditUser from '../EditUser/EditUser';
import AddUser from '../AddUser/AddUser'
import swal from 'sweetalert';

const mapState = ({ user }) => ({
    users: user.users,
    currentUser: user.currentUser
})
function ListUser(props) {

    const dispatch = useDispatch()
    const { users, currentUser } = useSelector(mapState)
    const [showModal, setShowModal] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const toggleModal = () => setShowModal(false);
    const toggleModalAdd = () => setShowModalAdd(false);

    useEffect(() => {
        dispatch(
            fetchUser()
        )
    }, [])

    const handleDelete = (documentID) => {
        dispatch(deleteUser(documentID))
        swal("Xoá user thành công!", "", "success");
    }
    return (
        <div>



            <h2>Danh sách tài khoản</h2>
            <div className="table-responsive">
                <table class="table table-light">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope='col'>Avata</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Vai Trò</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                const { displayName, email, userRoles, documentID, photoUrl } = user
                                return (
                                    <tr key={index}>
                                        <th className='' scope="row">{index + 1}</th>
                                        <td className='w-50'> <img className="img-thumbnail w-25" src={photoUrl} alt='Không có ảnh' /> </td>
                                        <td ><Link className='text-info' style={{ textDecoration: 'none' }} to={`/admin/edituser/${documentID}`} >{displayName}</Link> </td>
                                        <td className=''>{email}</td>
                                        <td className=''>{userRoles}</td>
                                        {currentUser.id == documentID ? (<td ><button className='btn btn-danger' onClick={() => handleDelete(documentID)} disabled='true'>X</button></td>)
                                            : <td ><button className='btn btn-danger' onClick={() => handleDelete(documentID)} >X</button></td>
                                        }


                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>

            {showModalAdd == true ? <AddUser showModalAdd={showModalAdd} toggleModal={toggleModalAdd} /> : ''}
            {/* <EditUser showModal={showModal} toggleModal={toggleModal} id={id} /> */}

        </div>
    );
}

export default ListUser;


