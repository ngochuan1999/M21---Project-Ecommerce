import './style.css';
import { auth, handleUserProfile } from "./firebase/ultils";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomeLayout from './views/Home/HomeLayout';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import ProductDetail from './views/ProductDetail/ProductDetail';
import { useEffect } from 'react';
import { checkUserSession } from './redux/User/user.action';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Admin/Dashboard/Dashboard';
import MainLayout from './views/MainLayout/MainLayout';
import AdminLayout from './Admin/AdminLayout/AdminLayout';
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
import FormProduct from './Admin/FormProduct/FormProduct';
import ListProduct from './Admin/Product/Listproduct/ListProduct';
import Main from './Admin/Main/Main';
import EditProduct from './Admin/Product/EditProduct.js/EditProduct';
import Cart from './views/Cart/Cart';
import Payment from './views/Payment/Payment';
import CheckOut from './views/CheckOut/CheckOut';
import ListUser from './Admin/User/ListUser.js/ListUser';
import ListOrder from './Admin/Order/ListOrdersjs/ListOrder';
import Order from './Admin/Order/OrderDetail/Order';
import OrderUser from './views/Order/OrderUser';
import OrderDetailUser from './views/OrderDetailUser/OrderDetailUser';
import Popup from './popup/Popup';
import swal from 'sweetalert';
import Contact from './views/Contact/contact';
import EditUser from './Admin/User/EditUser/EditUser';
import InfoUser from './views/InfoUser/InfoUser'
import Shop from './views/Shop/Shop';
import AddCategory from './Admin/Category/AddCategory/AddCategory';
import ListCategory from './Admin/Category/ListCategory/ListCategory';
import EditCategory from './Admin/Category/EditCategory/EditCategory';
import ListFeedback from './Admin/FeedBack/ListFeedback';
import ForgotPass from './component/ForgotPass/ForgotPass';


const mapState = ({ user }) => ({
  user: user.currentUser
})

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'vnd'
})



function App(props) {

  const dispatch = useDispatch();
  const { user } = useSelector(mapState);
  console.log(user)

  useEffect(() => {
    dispatch(checkUserSession());

  }, []);
  return (
    <div className="App">
      <div class="container-fluid">
        <Router>

          <Switch>

            <div >
              <Route exact path="/" >
                <MainLayout>
                  <HomeLayout />
                </MainLayout>

              </Route>
              <Route path="/login" render={() => user ? <Redirect to="/" /> : (<MainLayout><Login></Login> </MainLayout>)}>
              </Route>
              <Route path="/register" render={() => user ? <Redirect to="/" /> : (<MainLayout><Register></Register> </MainLayout>)}    >
              </Route>
              <Route path="/product/:id">
                <MainLayout>
                  <ProductDetail />
                </MainLayout>
              </Route>
              <Route path="/popup">
                <MainLayout>
                  <Popup />
                </MainLayout>
              </Route>
              <Route path="/cart">
                <MainLayout>
                  <CheckOut />
                </MainLayout>
              </Route>
              <Route path="/forgot">
                <MainLayout>
                  <ForgotPass />
                </MainLayout>
              </Route>
              <Route path="/contact">
                <MainLayout>
                  <Contact />
                </MainLayout>
              </Route>
              <Route exact path="/shop">
                <MainLayout>
                  <Shop />
                </MainLayout>
              </Route>
              <Route exact path="/shop/:filterType" render={() => (
                <MainLayout>
                  <Shop />
                </MainLayout>
              )} />

              <Route exact path="/order">
                <WithAuth>
                  <MainLayout>
                    <OrderUser />
                  </MainLayout>
                </WithAuth>
              </Route>

              <Route exact path="/order/:id" render={() => (
                <MainLayout>
                  <OrderDetailUser />
                </MainLayout>
              )} />
              <Route path="/payment" render={() => (
                <WithAuth>
                  <MainLayout>
                    <Payment />
                  </MainLayout>
                </WithAuth>
              )} />
              <Route path="/infouser" render={() => (
                <WithAuth>
                  <MainLayout>
                    <InfoUser />
                  </MainLayout>
                </WithAuth>
              )} />

              <Route exact path="/admin/" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <Main />
                  </Dashboard>
                </WithAdminAuth>
              )} />
              <Route exact path="/admin/order" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <ListOrder />
                  </Dashboard>
                </WithAdminAuth>
              )} />

              <Route exact path="/admin/order/:orderID" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <Order />
                  </Dashboard>
                </WithAdminAuth>
              )} />






              <Route exact path="/admin/newproduct" render={() => (
                <WithAdminAuth><Dashboard>
                  <FormProduct />
                </Dashboard></WithAdminAuth>

              )} />


              <Route exact path="/admin/listproduct" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <ListProduct />
                  </Dashboard>
                </WithAdminAuth>
              )} />


              <Route exact path="/admin/editproduct/:id" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <EditProduct />
                  </Dashboard>
                </WithAdminAuth>
              )} />



              <Route exact path="/admin/addcategory" render={() => (
                <WithAdminAuth><Dashboard>
                  <AddCategory />
                </Dashboard></WithAdminAuth>

              )} />


              <Route exact path="/admin/category" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <ListCategory />
                  </Dashboard>
                </WithAdminAuth>
              )} />


              <Route exact path="/admin/editcategory/:id" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <EditCategory />
                  </Dashboard>
                </WithAdminAuth>
              )} />

              <Route exact path="/admin/feedback" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <ListFeedback />
                  </Dashboard>
                </WithAdminAuth>
              )} />



              <Route exact path="/admin/listuser" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <ListUser />
                  </Dashboard>
                </WithAdminAuth>
              )} />

              <Route exact path="/admin/edituser/:id" render={() => (
                <WithAdminAuth>
                  <Dashboard>
                    <EditUser />
                  </Dashboard>
                </WithAdminAuth>
              )} />
            </div>

          </Switch>
        </Router>

      </div>

    </div>
  );
}


export default App;