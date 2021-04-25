import productsTypes from "./products.types";


export const addProduct = productData => ({
    type: productsTypes.ADD_NEW_PRODUCT,
    payload: productData
});


// products []
export const fetchProducts = (filters) => ({
    type: productsTypes.FETCH_PRODUCTS,
    payload: filters || undefined,
});
export const setProducts = products => ({
    type: productsTypes.SET_PRODUCTS,
    payload: products
})


// products []
export const fetchProductsHome = () => ({
    type: productsTypes.FETCH_PRODUCTS_HOME,
});
export const setProductsHome = products => ({
    type: productsTypes.SET_PRODUCTS_HOME,
    payload: products
})




// productDetail {}

export const fetchProductStart = productID => ({
    type: productsTypes.FETCH_PRODUCT_ID,
    payload: productID
});
export const setProduct = product => ({
    type: productsTypes.SET_PRODUCT,
    payload: product
});



// action
export const deleteProduct = productId => ({
    type: productsTypes.DELETE_PRODUCT,
    payload: productId
})
export const editProduct = (productData, id) => ({
    type: productsTypes.EDIT_PRODUCT,
    payload: productData,
    id: id

})
export const updateNumber = (product, cartItem) => ({
    type: productsTypes.UPDATE_NUMBER,
    product,
    cartItem
})





// loading 

export const productSucces = () => ({
    type: productsTypes.PRODUCT_LIST_SUCCESS
})


export const productDetailSucces = () => ({
    type: productsTypes.PRODUCT_DETAIL_SUCCESS
})