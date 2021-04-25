import React from 'react';
import { useSelector } from 'react-redux';
import { formatter } from '../../App';

const mapState = ({ orderData, productsData, message }) => ({
    listOrder: orderData.listOrder,
    listProduct: productsData.productsHome,
    listmessage: message.messages
})
function Main(props) {

    const { listOrder, listProduct, listmessage } = useSelector(mapState)

    const total = listOrder.reduce((a, b) => {
        return a + b.total

    }, 0)



    console.log('listOrder', total)
    console.log('listProduct', listProduct.length)
    return (

        <main className="col-10">
            <div className="row">
                <div className="col d-sm-flex align-items-center justify-content-center mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Thống kê</h1>

                </div>
            </div>
            <div className="row">


                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Doanh thu</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{formatter.format(total)}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tổng đơn hàng
                  </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{listOrder.length}</div>
                                        </div>
                                        <div className="col">
                                            {/* <div className="progress progress-sm mr-2">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Tổng sản phẩm</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{listProduct.length}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-warehouse fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                        Tổng phản hồi</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{listmessage.length}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-envelope fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;