import React from 'react'
const LoadMore = ({
    onLoadMoreEvt = () => { },
}) => {
    return (
        <div className='d-flex mt-2'>
            <button className='btn btn-info m-auto' onClick={() => onLoadMoreEvt()}>
                Xem thêm
        </button>
        </div>

    );
};

export default LoadMore;