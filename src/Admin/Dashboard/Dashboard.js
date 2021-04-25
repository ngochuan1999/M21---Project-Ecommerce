import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useScrollTop from '../../hook/useScrollTop';
import { getUserOrderHistory } from '../../redux/Order/order.action';
import Aside from '../Aside/Aside';
import FooterAdmin from '../FooterAdmin/FooterAdmin';
import './style.css'



const mapState = ({user , orderData }) => ({
  user : user.currentUser,
})
function Dashboard(props) {
  useScrollTop();
  const dispatch = useDispatch();
  const { user } = useSelector(mapState)
  console.log(user)

  useEffect(( ) => {
    dispatch(
      getUserOrderHistory(user.id)
    )
  },[] )
  return (
  
      <div className="row">
        <div className="col-lg-2 col-4">
        <Aside />
        </div>
       
        <div className="col-lg-10 col-8">
          {props.children}
        </div>    
        <FooterAdmin />

    </div>
  )

}

export default Dashboard;