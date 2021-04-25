import React from 'react'
import ProductResults from '../../component/ProductResults/ProductResults'
import useScrollTop from '../../hook/useScrollTop';
const Shop = ({ }) => {
    useScrollTop()
    return (
        <div className='shopPage'>
            <ProductResults />
        </div>
    )
}
export default Shop