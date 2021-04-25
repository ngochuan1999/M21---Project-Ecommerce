import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const mapState = (state) => ({
    currentUser: state.user.currentUser
})

function Aside(props) {

    const { currentUser } = useSelector(mapState)

    useEffect(() => {

    })

    return (

        <aside className=" bg-dark">
            <div className="avatar d-flex flex-column align-items-center">
                <img className="img-thumbnail w-50 rounded-circle " src={currentUser.photoUrl} alt="Thumbnail image" />
                <div>
                    <p className="text-white">{currentUser.displayName}</p>
                </div>

            </div>
            <div>
                <div></div>
                <ul className="list-unstyled">
                    <li className="m-3"><Link style={{ textDecoration: 'none' }} className="text-white" to="/"><i class="fas fa-home"></i> Website</Link> </li>
                    <li className="m-3"><Link style={{ textDecoration: 'none' }} className="text-white" to="/admin"><i class="fas fa-tablet-alt"></i> Tổng quan</Link> </li>
                    <li className="m-3"><Link style={{ textDecoration: 'none' }} className="text-white" to="/admin/order"><i class="fas fa-truck"></i> Quản lý đơn hàng</Link> </li>
                    <li className="m-3"> <Link style={{ textDecoration: 'none' }} className="text-white" to="/admin/listproduct"><i class="fas fa-bookmark"></i> Quản lý sản phẩm</Link> </li>
                    <li className="m-3"> <Link style={{ textDecoration: 'none' }} className="text-white" to="/admin/listuser"><i class="fas fa-users-cog"></i> Quản lý người dùng</Link> </li>
                    <li className="m-3"> <Link style={{ textDecoration: 'none' }} className="text-white" to="/admin/category"><i class="fas fa-users-cog"></i> Quản lý danh mục</Link> </li>
                    <li className="m-3"> <Link style={{ textDecoration: 'none' }} className="text-white" to="/admin/feedback"><i class="fas fa-users-cog"></i> Quản lý phản hồi</Link> </li>
                </ul>
            </div>
        </aside>

    );
}

export default Aside;